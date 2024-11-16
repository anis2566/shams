"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

export const DELETE_REVIEW_ACTION = async (id: string) => {
  try {
    const review = await db.review.findUnique({
      where: {
        id,
      },
    });

    if (!review) {
      return {
        error: "Review not found",
      };
    }

    await db.review.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/reviews");

    return {
      success: "Review deleted",
    };
  } catch (error) {
    return {
      error: "Failed to delete review",
    };
  }
};
