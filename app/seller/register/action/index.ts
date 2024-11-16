"use server";

import { Role, SellerStatus } from "@prisma/client";

import { db } from "@/lib/prisma";
import { SellerSchema, SellerSchemaType } from "@/schema/seller.schema";
import { GET_USER } from "@/services/user.service";

export const SELLER_REGISTER_ACTION = async (values: SellerSchemaType) => {
  const { data, success } = SellerSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const { userId } = await GET_USER();

    const seller = await db.seller.findUnique({
      where: {
        userId,
        status: SellerStatus.Active,
      },
    });

    if (seller) {
      return {
        error: "Seller already registered",
      };
    }

    const request = await db.seller.findUnique({
      where: {
        userId,
        status: SellerStatus.Pending,
      },
    });

    if (request) {
      return {
        error: "Seller request already sent",
      };
    }

    await db.seller.create({
      data: { ...data, userId },
    });

    await db.user.update({
      where: { id: userId },
      data: { role: Role.Seller, status: SellerStatus.Pending },
    });

    return {
      success: "Seller registered.",
    };
  } catch (error) {
    return {
      error: "Failed to register seller",
    };
  }
};
