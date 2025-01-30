"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { GET_ROLE } from "@/services/user.service";

export const DELETE_REVIEW_ACTION = async (id: string) => {
  const { isAdmin, isEditor } = await GET_ROLE();

  if (!(!isAdmin || !isEditor)) {
    return {
      error: "Permission denied",
    };
  }

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
