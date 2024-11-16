"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { BannerSchema, BannerSchemaType } from "@/schema/banner.schema";
import { BannerStatus } from "@prisma/client";

export const CREATE_BANNER_ACTION = async (values: BannerSchemaType) => {
  const { data, success } = BannerSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const banner = await db.banner.create({
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/banners");

    return {
      success: "Banner created.",
    };
  } catch (error) {
    return {
      error: "Failed to create banner",
    };
  }
};

export const DELETE_BANNER_ACTION = async (id: string) => {
  try {
    const banner = await db.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      return {
        error: "Banner not found",
      };
    }

    await db.banner.delete({
      where: { id },
    });

    revalidatePath("/dashboard/banners");

    return {
      success: "Banner deleted.",
    };
  } catch (error) {
    return {
      error: "Failed to delete banner",
    };
  }
};

interface ToggleBannerStatusProps {
  id: string;
  status: BannerStatus;
}

export const TOGGLE_BANNER_STATUS_ACTION = async ({
  id,
  status,
}: ToggleBannerStatusProps) => {
  try {
    const banner = await db.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      return {
        error: "Banner not found",
      };
    }

    await db.banner.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/dashboard/banners");

    return {
      success: "Banner status toggled.",
    };
  } catch (error) {
    return {
      error: "Failed to toggle banner status",
    };
  }
};
