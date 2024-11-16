"use server";

import { transliterate as tr } from "transliteration";

import { BookSchema, BookSchemaType } from "@/schema/book.schema";
import { db } from "@/lib/prisma";
import { GET_USER } from "@/services/user.service";
import { AuthorSchema, AuthorSchemaType } from "@/schema/author.schema";
import { CategorySchema, CategorySchemaType } from "@/schema/category.schema";
import {
  SubCategorySchema,
  SubCategorySchemaType,
} from "@/schema/sub-category.schema";
import {
  PublicationSchema,
  PublicationSchemaType,
} from "@/schema/publication.schema";
import { revalidatePath } from "next/cache";

export const CREATE_BOOK_ACTION = async (values: BookSchemaType) => {
  const { data, success } = BookSchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const { userId } = await GET_USER();

    const seller = await db.seller.findUnique({
      where: {
        userId,
      },
    });

    if (!seller) {
      return {
        error: "Seller not found",
      };
    }

    const book = await db.book.findFirst({
      where: {
        name: data.name,
        sellerId: seller.id,
      },
    });

    if (book)
      return {
        error: "Book already exists",
      };

    let nameBangla = "";

    const isBangla = (text: string) => /[\u0980-\u09FF]/.test(text);

    if (isBangla(data.name)) {
      nameBangla = tr(data.name);
    }

    await db.book.create({
      data: {
        ...data,
        nameBangla,
        sellerId: seller.id,
      },
    });

    return {
      success: "Book created.",
    };
  } catch (error) {
    return {
      error: "Failed to create book",
    };
  }
};

type EditBook = {
  id: string;
  values: BookSchemaType;
};

export const EDIT_BOOK_ACTION = async ({ id, values }: EditBook) => {
  const { data, success } = BookSchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const { userId } = await GET_USER();

    const seller = await db.seller.findUnique({
      where: {
        userId,
      },
    });

    if (!seller) {
      return {
        error: "Seller not found",
      };
    }

    const book = await db.book.findUnique({
      where: {
        id,
        sellerId: seller.id,
      },
    });

    if (!book)
      return {
        error: "Book not found",
      };

    await db.book.update({
      where: {
        id,
        sellerId: seller.id,
      },
      data: {
        ...data,
      },
    });

    revalidatePath("/seller/books");

    return {
      success: "Book updated",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to edit book",
    };
  }
};

export const CREATE_AUTHOR_ACTION = async (values: AuthorSchemaType) => {
  const { data, success } = AuthorSchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const { userId } = await GET_USER();

    const seller = await db.seller.findUnique({
      where: {
        userId,
      },
    });

    if (!seller) {
      return {
        error: "Seller not found",
      };
    }

    const author = await db.author.findFirst({
      where: {
        email: data.email,
      },
    });

    if (author) {
      return {
        error: "Author already exists",
      };
    }

    let nameBangla = "";

    const isBangla = (text: string) => /[\u0980-\u09FF]/.test(text);

    if (isBangla(data.name)) {
      nameBangla = tr(data.name);
    }

    await db.author.create({
      data: {
        ...data,
        nameBangla,
      },
    });

    return {
      success: "Author created.",
    };
  } catch (error) {
    return {
      error: "Failed to create author",
    };
  }
};

export const CREATE_CATEGORY_ACTION = async (values: CategorySchemaType) => {
  const { data, success } = CategorySchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const { userId } = await GET_USER();

    const seller = await db.seller.findUnique({
      where: {
        userId,
      },
    });

    if (!seller) {
      return {
        error: "Seller not found",
      };
    }

    const category = await db.category.findFirst({
      where: {
        name: data.name,
      },
    });

    if (category) {
      return {
        error: "Category already exists",
      };
    }

    let nameBangla = "";

    const isBangla = (text: string) => /[\u0980-\u09FF]/.test(text);

    if (isBangla(data.name)) {
      nameBangla = tr(data.name);
    }

    await db.category.create({
      data: {
        ...data,
        nameBangla,
      },
    });

    return {
      success: "Category created.",
    };
  } catch (error) {
    return {
      error: "Failed to create category",
    };
  }
};

interface CreateSubCategoryAction {
  categoryId: string;
  values: SubCategorySchemaType;
}

export const CREATE_SUB_CATEGORY_ACTION = async ({
  categoryId,
  values,
}: CreateSubCategoryAction) => {
  const { data, success } = SubCategorySchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const { userId } = await GET_USER();

    const seller = await db.seller.findUnique({
      where: {
        userId,
      },
    });

    if (!seller) {
      return {
        error: "Seller not found",
      };
    }

    const subCategory = await db.subCategory.findFirst({
      where: {
        name: data.name,
      },
    });

    if (subCategory) {
      return {
        error: "Sub-Category already exists",
      };
    }

    let nameBangla = "";

    const isBangla = (text: string) => /[\u0980-\u09FF]/.test(text);

    if (isBangla(data.name)) {
      nameBangla = tr(data.name);
    }

    await db.subCategory.create({
      data: {
        ...data,
        categoryId,
        nameBangla,
      },
    });

    return {
      success: "Sub-Category created.",
    };
  } catch (error) {
    return {
      error: "Failed to create sub-category",
    };
  }
};

export const CREATE_PUBLICATION_ACTION = async (
  values: PublicationSchemaType,
) => {
  const { data, success } = PublicationSchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const { userId } = await GET_USER();

    const seller = await db.seller.findUnique({
      where: {
        userId,
      },
    });

    if (!seller) {
      return {
        error: "Seller not found",
      };
    }

    const publication = await db.publication.findFirst({
      where: {
        name: data.name,
      },
    });

    if (publication) {
      return {
        error: "Publication already exists",
      };
    }

    let nameBangla = "";

    const isBangla = (text: string) => /[\u0980-\u09FF]/.test(text);

    if (isBangla(data.name)) {
      nameBangla = tr(data.name);
    }

    await db.publication.create({
      data: {
        ...data,
        nameBangla,
      },
    });

    return {
      success: "Publication created.",
    };
  } catch (error) {
    return {
      error: "Failed to create publication",
    };
  }
};

export const DELETE_BOOK_ACTION = async (id: string) => {
  try {
    const { userId } = await GET_USER();

    const seller = await db.seller.findUnique({
      where: {
        userId,
      },
    });

    if (!seller) {
      return {
        error: "Seller not found",
      };
    }

    const book = await db.book.findUnique({
      where: {
        id,
        sellerId: seller.id,
      },
    });

    if (!book) {
      return {
        error: "Book not found",
      };
    }

    await db.book.delete({
      where: {
        id,
        sellerId: seller.id,
      },
    });

    revalidatePath("/seller/books");

    return {
      success: "Book deleted",
    };
  } catch (error) {
    return { error: "Failed to delete book" };
  }
};
