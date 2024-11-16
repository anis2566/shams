import { BookStatus, Language } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { transliterate as tr } from "transliteration";

import { db } from "@/lib/prisma";
import { BookPage, getBookDataInclude } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor") || undefined;
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const author = searchParams.get("author");
    const publication = searchParams.get("publication");
    const discount = searchParams.get("discount") === "true" || false;
    const query = searchParams.get("query");
    const sort = searchParams.get("sort");
    const minPrice = searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice") || "0")
      : null;
    const maxPrice = searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice") || "500")
      : null;
    const minDiscount = searchParams.get("minDiscount")
      ? parseFloat(searchParams.get("minDiscount") || "0")
      : null;
    const maxDiscount = searchParams.get("maxDiscount")
      ? parseFloat(searchParams.get("maxDiscount") || "100")
      : null;
    const language = searchParams.get("language") || null;
    const inStock = searchParams.get("inStock") || null;

    const isBangla = (text: string) => /[\u0980-\u09FF]/.test(text);
    let isBanglaQuery = isBangla(query || "");
    let banglaQuery = isBanglaQuery ? tr(query || "") : null;

    console.log(minDiscount, maxDiscount);

    const pageSize = 12;

    const [books, total] = await db.$transaction([
      db.book.findMany({
        where: {
          status: BookStatus.Published,
          ...(author && {
            author: {
              name: {
                contains: author,
                mode: "insensitive",
              },
            },
          }),
          ...(category && {
            categoryId: category,
          }),
          ...(subcategory && {
            subCategoryId: subcategory,
          }),
          ...(publication && {
            publicationId: publication,
          }),
          ...(discount && {
            discountPrice: {
              not: null,
            },
          }),
          ...(query && {
            ...(isBanglaQuery && {
              nameBangla: {
                contains: banglaQuery || "",
                mode: "insensitive",
              },
            }),
            ...(!isBanglaQuery && {
              name: {
                contains: query,
                mode: "insensitive",
              },
            }),
          }),
          ...(minPrice !== null &&
            maxPrice !== null && {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            }),
          ...(minPrice !== null &&
            maxPrice === null && {
              price: {
                gte: minPrice,
              },
            }),
          ...(maxPrice !== null &&
            minPrice === null && {
              price: {
                lte: maxPrice,
              },
            }),
          ...(minDiscount !== null &&
            maxDiscount !== null && {
              discountPercent: {
                gte: minDiscount,
                lte: maxDiscount,
              },
            }),
          ...(minDiscount !== null &&
            maxDiscount === null && {
              discountPercent: {
                gte: minDiscount,
              },
            }),
          ...(maxDiscount !== null &&
            minDiscount === null && {
              discountPercent: {
                lte: maxDiscount,
              },
            }),
          ...(sort === "discount_desc" || sort === "discount_asc"
            ? {
                discountPercent: {
                  not: null,
                },
              }
            : {}),
          ...(language && {
            language: language as Language,
          }),
          ...(inStock && {
            stock: {
              not: 0,
            },
          }),
        },
        include: getBookDataInclude(),
        orderBy: {
          ...(sort === "desc" && { createdAt: "desc" }),
          ...(sort === "b_desc" && { createdAt: "desc" }),
          ...(sort === "total_sell_asc" && { totalSold: "asc" }),
          ...(sort === "price_asc" && { price: "asc" }),
          ...(sort === "price_desc" && { price: "desc" }),
          ...(sort === "discount_desc" && { discountPercent: "desc" }),
          ...(sort === "discount_asc" && { discountPercent: "asc" }),
        },
        take: pageSize + 1,
        cursor: cursor ? { id: cursor } : undefined,
      }),
      db.book.count({
        where: {
          status: BookStatus.Published,
          ...(author && {
            author: {
              name: {
                contains: author,
                mode: "insensitive",
              },
            },
          }),
          ...(category && {
            categoryId: category,
          }),
          ...(subcategory && {
            subCategoryId: subcategory,
          }),
          ...(publication && {
            publicationId: publication,
          }),
          ...(discount && {
            discountPrice: {
              not: null,
            },
          }),
          ...(query && {
            ...(isBanglaQuery && {
              nameBangla: {
                contains: banglaQuery || "",
                mode: "insensitive",
              },
            }),
            ...(!isBanglaQuery && {
              name: {
                contains: query,
                mode: "insensitive",
              },
            }),
          }),
          ...(minPrice !== null &&
            maxPrice !== null && {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            }),
          ...(minPrice !== null &&
            maxPrice === null && {
              price: {
                gte: minPrice,
              },
            }),
          ...(maxPrice !== null &&
            minPrice === null && {
              price: {
                lte: maxPrice,
              },
            }),
          ...(minDiscount !== null &&
            maxDiscount !== null && {
              discountPercent: {
                gte: minDiscount,
                lte: maxDiscount,
              },
            }),
          ...(minDiscount !== null &&
            maxDiscount === null && {
              discountPercent: {
                gte: minDiscount,
              },
            }),
          ...(maxDiscount !== null &&
            minDiscount === null && {
              discountPercent: {
                lte: maxDiscount,
              },
            }),
          ...(sort === "discount_desc" || sort === "discount_asc"
            ? {
                discountPercent: {
                  not: null,
                },
              }
            : {}),
          ...(language && {
            language: language as Language,
          }),
          ...(inStock && {
            stock: {
              not: 0,
            },
          }),
        },
      }),
    ]);

    const nextCursor = books.length > pageSize ? books[pageSize].id : null;

    const data: BookPage = {
      books,
      nextCursor,
      total,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
