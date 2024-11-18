"use server";

import { Month } from "@prisma/client";
import webPush, { WebPushError } from "web-push";

import { db } from "@/lib/prisma";
import { OrderSchema, OrderSchemaType } from "@/schema/order.schema";
import { sendNotification } from "@/services/notification.servece";
import { GET_ADMIN, GET_USER } from "@/services/user.service";

export const CREATE_ORDER_ACTION = async (values: OrderSchemaType) => {
  const { data, success } = OrderSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  const totalPrice = data.orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingCharge = data.city === "Dhaka" ? 60 : 100;
  const totalPaidAmount = totalPrice + shippingCharge;

  const { userId } = await GET_USER();

  try {
    const order = await db.order.create({
      data: {
        name: data.name,
        phone: data.phone,
        altPhone: data.altPhone,
        country: data.country,
        city: data.city,
        thana: data.thana,
        zone: data.zone,
        address: data.address,
        totalPrice,
        shippingCharge,
        totalPaidAmount,
        paymentMethod: data.paymentMethod,
        orderItems: {
          createMany: {
            data: data.orderItems,
          },
        },
        userId,
        month: Object.values(Month)[new Date().getMonth()],
      },
      include: {
        orderItems: true,
      },
    });

    for (const item of order.orderItems) {
      await db.book.update({
        where: {
          id: item.bookId,
        },
        data: {
          stock: { decrement: item.quantity },
        },
      });
    }

    const { adminId } = await GET_ADMIN();

    if (!adminId) {
      return {
        success: "Order placed.",
        id: order.id,
      };
    }

    const subscribers = await db.pushSubscriber.findMany({
      where: { userId: adminId },
    });

    if (subscribers.length > 0) {
      const pushPromises = subscribers.map((item) => {
        return webPush
          .sendNotification(
            {
              endpoint: item.endpoint,
              keys: {
                auth: item.auth,
                p256dh: item.p256dh,
              },
            },
            JSON.stringify({
              title: `New Order`,
              body: `You have a new order from ${order.name}`,
              data: {
                redirectUrl: `/dashboard/orders/${order.id}`,
              },
            }),
            {
              vapidDetails: {
                subject: "mailto:shamspublication57@gmail.com",
                publicKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY!,
                privateKey: process.env.WEB_PUSH_PRIVATE_KEY!,
              },
            },
          )
          .catch((error) => {
            console.error("Error sending push notification:", error);
            if (error instanceof WebPushError && error.statusCode === 410) {
              console.log("Push subscription expired, deleting...");
              return db.pushSubscriber.delete({
                where: { id: item.id },
              });
            }
          });
      });

      await Promise.all(pushPromises);
    }

    await sendNotification({
      trigger: "new-order",
      actor: {
        id: userId,
        name: data.name || "",
      },
      recipients: [adminId || ""],
      data: {
        name: data.name || "",
        redirectUrl: "/dashboard/orders",
      },
    });

    return {
      success: "Order placed.",
      id: order.id,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create order",
    };
  }
};
