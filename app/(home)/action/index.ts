"use server";

import {
  AuthorStatus,
  BannerStatus,
  BookStatus,
  CategoryStatus,
  PublicationStatus,
} from "@prisma/client";

import { db } from "@/lib/prisma";
import { BookGenre, CategoryGenre } from "@/constant";

export const GET_AUTHORS = async () => {
  const authors = await db.author.findMany({
    where: {
      status: AuthorStatus.Active,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return authors;
};

export const GET_CATEGORIES = async () => {
  const categories = await db.category.findMany({
    where: {
      status: CategoryStatus.Active,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return categories;
};

export const GET_PUBLICATIONS = async () => {
  const publications = await db.publication.findMany({
    where: {
      status: PublicationStatus.Active,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return publications;
};

export const GET_SUB_CATEGORIES = async (categoryId: string) => {
  const subCategories = await db.subCategory.findMany({
    where: {
      status: CategoryStatus.Active,
      categoryId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return subCategories;
};

export const GET_CATEGORIES_HOME = async () => {
  const categories = await db.category.findMany({
    where: {
      status: CategoryStatus.Active,
    },
    include: {
      subCategories: {
        take: 4,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return categories;
};

export const GET_RELATED_BOOKS = async (
  categoryId: string,
  subCategoryId: string | null,
) => {
  const books = await db.book.findMany({
    where: {
      categoryId,
      ...(subCategoryId ? { subCategoryId } : {}),
    },
    include: {
      author: true,
    },
    orderBy: {
      totalReview: "asc",
    },
  });
  return books;
};

export const GET_TRENDING_BOOKS = async () => {
  const books = await db.book.findMany({
    where: {
      status: BookStatus.Published,
      genre: BookGenre.TRENDING,
    },
    include: {
      author: true,
    },
    orderBy: {
      totalReview: "desc",
    },
    take: 12,
  });
  return books;
};

export const GET_FOR_YOU = async () => {
  const books = await db.book.findMany({
    where: {
      status: BookStatus.Published,
    },
    include: {
      author: true,
    },
    orderBy: {
      rating: "asc",
    },
    take: 12,
  });
  return books;
};

export const GET_BOOK_BY_PUBLICATION = async (publicationId: string) => {
  const books = await db.book.findMany({
    where: {
      publicationId,
    },
    include: {
      author: true,
    },
    orderBy: {
      totalSold: "asc",
    },
    take: 12,
  });
  return books;
};

export const GET_DISCOUNT_BOOKS = async () => {
  const books = await db.book.findMany({
    where: {
      status: BookStatus.Published,
      discountPercent: {
        not: null,
      },
    },
    include: {
      author: true,
    },
    orderBy: {
      discountPercent: "asc",
    },
    take: 12,
  });
  return books;
};

export const GET_BEST_SELLING_BOOKS = async () => {
  const books = await db.book.findMany({
    where: {
      status: BookStatus.Published,
    },
    include: {
      author: true,
    },
    orderBy: {
      totalSold: "asc",
    },
    take: 12,
  });
  return books;
};

export const GET_RECENTLY_ADDED = async () => {
  const books = await db.book.findMany({
    where: {
      status: BookStatus.Published,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 12,
  });
  return books;
};

export const GET_FEATURE_CATEGORY = async () => {
  const categories = await db.category.findMany({
    where: {
      status: CategoryStatus.Active,
      genre: CategoryGenre.FEATURED,
    },
    take: 6,
  });
  return categories;
};

export const GET_BANNERS = async () => {
  const banners = await db.banner.findMany({
    where: {
      status: BannerStatus.Active,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return banners;
};

export const SUBSCRIBE_EMAIL = async (email: string) => {
  try {
    const isSubscribed = await db.subscriber.findUnique({
      where: { email },
    });

    if (isSubscribed) {
      return {
        success: false,
        error: "You are already subscribed",
      };
    }

    await db.subscriber.create({
      data: { email },
    });

    return {
      success: "You have been subscribed successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};
