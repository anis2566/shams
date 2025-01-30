"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { GET_ROLE } from "@/services/user.service";

export const DELETE_SUBSCRIBER_ACTION = async (id: string) => {
  const { isAdmin } = await GET_ROLE();

  if (!isAdmin) {
    return {
      error: "Permission denied",
    };
  }

  try {
    const subscriber = await db.subscriber.findUnique({ where: { id } });
    if (!subscriber) {
      return { error: "Subscriber not found" };
    }

    await db.subscriber.delete({ where: { id } });

    revalidatePath("/dashboard/subscribers");

    return { success: "Subscriber deleted successfully" };
  } catch (error) {
    return {
      error: "Failed to delete subscriber",
    };
  }
};
