import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";
import { CategoryPage } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor") || undefined;

    const pageSize = 4;

    const categories = await db.category.findMany({
      where: {},
      orderBy: {
        createdAt: "asc",
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor =
      categories.length > pageSize ? categories[pageSize].id : null;

    const data: CategoryPage = {
      categories,
      nextCursor,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
