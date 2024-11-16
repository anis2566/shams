"use server";

import { revalidatePath } from "next/cache";
import { transliterate as tr } from "transliteration";

import { db } from "@/lib/prisma";
import {
  PublicationSchema,
  PublicationSchemaType,
} from "@/schema/publication.schema";

export const CREATE_PUBLICATION_ACTION = async (
  values: PublicationSchemaType,
) => {
  const { data, success } = PublicationSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
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

    revalidatePath("/dashboard/publications");

    return {
      success: "Publication created",
    };
  } catch (error) {
    return {
      error: "Failed to create publication",
    };
  }
};

type EditPublication = {
  id: string;
  values: PublicationSchemaType;
};

export const EDIT_PUBLICATION_ACTION = async ({
  id,
  values,
}: EditPublication) => {
  const { data, success } = PublicationSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const publication = await db.publication.findUnique({
      where: {
        id,
      },
    });

    if (!publication) {
      return {
        error: "Publication not found",
      };
    }

    await db.publication.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/publications");

    return {
      success: "Publication updated",
    };
  } catch (error) {
    return {
      error: "Failed to update publication",
    };
  }
};

export const DELETE_PUBLICATION_ACTION = async (id: string) => {
  try {
    const publication = await db.publication.findUnique({
      where: {
        id,
      },
    });

    if (!publication) {
      return {
        error: "Publication not found",
      };
    }

    await db.publication.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/publications");

    return {
      success: "Publication deleted",
    };
  } catch (error) {
    return {
      error: "Failed to delete publication",
    };
  }
};
