import { NextRequest } from "next/server";

import { db } from "@/lib/prisma";
import { getReviewDataInclude, ReviewPage } from "@/lib/types";

export async function GET(
  req: NextRequest,
  { params: { bookId } }: { params: { bookId: string } },
) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 3;

    const reviews = await db.review.findMany({
      where: { bookId },
      include: getReviewDataInclude(),
      orderBy: { createdAt: "asc" },
      take: -pageSize - 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const previousCursor = reviews.length > pageSize ? reviews[0].id : null;

    const data: ReviewPage = {
      reviews: reviews.length > pageSize ? reviews.slice(1) : reviews,
      previousCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
