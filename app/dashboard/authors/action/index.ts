"use server";

import { revalidatePath } from "next/cache";
import { transliterate as tr } from "transliteration";

import { db } from "@/lib/prisma";
import { AuthorSchema, AuthorSchemaType } from "@/schema/author.schema";

export const CREATE_AUTHOR_ACTION = async (values: AuthorSchemaType) => {
  const { data, success } = AuthorSchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
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

    revalidatePath("/dashboard/authors");

    return {
      success: "Author created successfully",
    };
  } catch (error) {
    return {
      error: "Failed to create author",
    };
  }
};

type EditAuthor = {
  id: string;
  values: AuthorSchemaType;
};

export const EDIT_AUTHOR_ACTION = async ({ id, values }: EditAuthor) => {
  const { data, success } = AuthorSchema.safeParse(values);

  if (!success)
    return {
      error: "Invalid input values",
    };

  try {
    const author = await db.author.findUnique({
      where: {
        id,
      },
    });

    if (!author) {
      return {
        error: "Author not found",
      };
    }

    await db.author.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/authors");

    return {
      success: "Author updated successfully",
    };
  } catch (error) {
    return {
      error: "Failed to update author",
    };
  }
};

export const DELETE_AUTHOR_ACTION = async (id: string) => {
  try {
    const author = await db.author.findUnique({
      where: {
        id,
      },
    });

    if (!author) {
      return {
        error: "Author not found",
      };
    }

    await db.author.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/authors");

    return {
      success: "Author deleted",
    };
  } catch (error) {
    return {
      error: "Failed to delete author",
    };
  }
};
