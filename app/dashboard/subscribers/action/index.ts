"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

export const DELETE_SUBSCRIBER_ACTION = async (id: string) => {
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
