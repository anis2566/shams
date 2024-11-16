"use server";

import { Role, SellerStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { SellerSchemaAdmin } from "@/schema/seller.schema";
import { SellerSchemaAdminType } from "@/schema/seller.schema";

type UpdateSellerStatusProps = {
  id: string;
  status: SellerStatus;
};

export const UPDATE_SELLER_STATUS_ACTION = async ({
  id,
  status,
}: UpdateSellerStatusProps) => {
  try {
    const request = await db.seller.findUnique({ where: { id } });

    if (!request) throw new Error("Request not found");

    if (status === SellerStatus.Active) {
      await db.user.update({
        where: { id: request.userId },
        data: { status: SellerStatus.Active },
      });
    }

    if (status === SellerStatus.Inactive) {
      await db.user.update({
        where: { id: request.userId },
        data: { status: SellerStatus.Inactive, role: Role.User },
      });
    }

    await db.seller.update({ where: { id }, data: { status } });

    revalidatePath("/dashboard/seller/request");

    return {
      success: "Seller status updated",
    };
  } catch (error) {
    return {
      error: "Failed to update seller status",
    };
  }
};

export const DELETE_SELLER_REQUEST_ACTION = async (id: string) => {
  try {
    const request = await db.seller.findUnique({ where: { id } });

    if (!request) throw new Error("Request not found");

    await Promise.all([
      db.user.update({
        where: { id: request.userId },
        data: { status: SellerStatus.Inactive, role: Role.User },
      }),
      db.seller.delete({ where: { id } }),
    ]);

    revalidatePath("/dashboard/seller/request");

    return {
      success: "Seller request deleted",
    };
  } catch (error) {
    return {
      error: "Failed to delete seller request",
    };
  }
};

export const GET_USERS_FOR_SELLER_ACTION = async (name?: string) => {
  const users = await db.user.findMany({
    where: {
      ...(name && { name: { contains: name, mode: "insensitive" } }),
      role: Role.User,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });
  return users;
};

export const SELLER_REGISTER_ADMIN_ACTION = async (
  values: SellerSchemaAdminType,
) => {
  const { data, success } = SellerSchemaAdmin.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const seller = await db.seller.findUnique({
      where: {
        userId: data.userId,
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
        userId: data.userId,
        status: SellerStatus.Pending,
      },
    });

    if (request) {
      return {
        error: "Seller request already sent",
      };
    }

    await db.seller.create({
      data: { ...data, status: SellerStatus.Active },
    });

    await db.user.update({
      where: { id: data.userId },
      data: { role: Role.Seller, status: SellerStatus.Active },
    });

    revalidatePath("/dashboard/seller");

    return {
      success: "Seller registered.",
    };
  } catch (error) {
    return {
      error: "Failed to register seller",
    };
  }
};

export const DELETE_SELLER_ACTION = async (id: string) => {
  try {
    const seller = await db.seller.findUnique({ where: { id } });

    if (!seller) throw new Error("Seller not found");

    await Promise.all([
      db.user.update({
        where: { id: seller.userId },
        data: { role: Role.User, status: SellerStatus.Pending },
      }),
      db.seller.delete({ where: { id } }),
    ]);

    revalidatePath("/dashboard/seller");

    return {
      success: "Seller deleted",
    };
  } catch (error) {
    return {
      error: "Failed to delete seller",
    };
  }
};
