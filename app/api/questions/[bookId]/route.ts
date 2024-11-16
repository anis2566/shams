import { NextRequest } from "next/server";

import { db } from "@/lib/prisma";
import { getQuestionDataInclude, QuestionPage } from "@/lib/types";

export async function GET(
  req: NextRequest,
  { params: { bookId } }: { params: { bookId: string } },
) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 3;

    const questions = await db.question.findMany({
      where: { bookId },
      include: getQuestionDataInclude(),
      orderBy: { createdAt: "asc" },
      take: -pageSize - 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const previousCursor = questions.length > pageSize ? questions[0].id : null;

    const data: QuestionPage = {
      questions: questions.length > pageSize ? questions.slice(1) : questions,
      previousCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
