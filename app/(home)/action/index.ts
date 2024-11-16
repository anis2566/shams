"use server";

import {
  AuthorStatus,
  BannerStatus,
  BookStatus,
  CategoryStatus,
  PublicationStatus,
} from "@prisma/client";

import { db } from "@/lib/prisma";

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
      createdAt: "desc",
    },
    take: 12,
  });
  return books;
};

export const GET_DISCOUNT_BOOKS = async () => {
  const books = await db.book.findMany({
    where: {
      status: BookStatus.Published,
      discountPrice: {
        not: null,
      },
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
      isFeatured: true,
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
