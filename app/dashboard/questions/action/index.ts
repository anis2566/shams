"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { GET_USER } from "@/services/user.service";

type ReplyQuestionAction = {
  id: string;
  answer: string;
};

export const REPLY_QUESTION_ACTION = async ({
  id,
  answer,
}: ReplyQuestionAction) => {
  const { userId } = await GET_USER();

  try {
    const question = await db.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) {
      return {
        error: "Question not found",
      };
    }

    await db.answer.create({
      data: {
        userId,
        questionId: id,
        answer,
      },
    });

    revalidatePath("/dashboard/questions");

    return {
      success: "Question replied",
    };
  } catch (error) {
    return {
      error: "Failed to reply question",
    };
  }
};

export const DELETE_QUESTION_ACTION = async (id: string) => {
  try {
    const question = await db.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) {
      return {
        error: "Question not found",
      };
    }

    await db.question.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/questions");

    return {
      success: "Question deleted",
    };
  } catch (error) {
    return {
      error: "Failed to delete question",
    };
  }
};
