"use server";

import { revalidatePath } from "next/cache";
import { transliterate as tr } from "transliteration";

import { db } from "@/lib/prisma";
import { CategorySchema, CategorySchemaType } from "@/schema/category.schema";
import {
  SubCategorySchema,
  SubCategorySchemaType,
} from "@/schema/sub-category.schema";

export const CREATE_CATEGORY_ACTION = async (values: CategorySchemaType) => {
  const { data, success } = CategorySchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
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

    revalidatePath("/dashboard/categories");

    return {
      success: "Category created",
    };
  } catch (error) {
    return {
      error: "Failed to create category",
    };
  }
};

type EditCategory = {
  id: string;
  values: CategorySchemaType;
};

export const EDIT_CATEGORY_ACTION = async ({ id, values }: EditCategory) => {
  const { data, success } = CategorySchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return {
        error: "Category not found",
      };
    }

    await db.category.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/categories");

    return {
      success: "Category updated",
    };
  } catch (error) {
    return {
      error: "Failed to update category",
    };
  }
};

export const DELETE_CATEGORY_ACTION = async (id: string) => {
  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return {
        error: "Category not found",
      };
    }

    await db.category.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard/categories");

    return {
      success: "Category deleted",
    };
  } catch (error) {
    return {
      error: "Failed to delete category",
    };
  }
};

type CreateSubCategory = {
  categoryId: string;
  values: SubCategorySchemaType;
};

export const CREATE_SUB_CATEGORY_ACTION = async ({
  categoryId,
  values,
}: CreateSubCategory) => {
  const { data, success } = SubCategorySchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const subCategory = await db.subCategory.findFirst({
      where: {
        name: data.name,
      },
    });

    if (subCategory) {
      return {
        error: "Sub category already exists",
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

    revalidatePath("/dashboard/categories");

    return {
      success: "Sub category created",
      categoryId,
    };
  } catch (error) {
    return {
      error: "Failed to create sub category",
    };
  }
};

type EditSubCategory = {
  id: string;
  values: SubCategorySchemaType;
};

export const EDIT_SUB_CATEGORY_ACTION = async ({
  id,
  values,
}: EditSubCategory) => {
  const { data, success } = SubCategorySchema.safeParse(values);

  if (!success) {
    return {
      error: "Invalid input values",
    };
  }

  try {
    const subCategory = await db.subCategory.findUnique({
      where: {
        id,
      },
    });

    if (!subCategory) {
      return {
        error: "Sub category not found",
      };
    }

    await db.subCategory.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    revalidatePath("/dashboard/categories");

    return {
      success: "Sub category updated",
      categoryId: subCategory.categoryId,
    };
  } catch (error) {
    return {
      error: "Failed to update sub category",
    };
  }
};

export const DELETE_SUB_CATEGORY_ACTION = async (id: string) => {
  try {
    const subCategory = await db.subCategory.findUnique({
      where: {
        id,
      },
    });

    if (!subCategory) {
      return {
        error: "Sub category not found",
      };
    }

    await db.subCategory.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/dashboard/categories/${subCategory.categoryId}/sub`);

    return {
      success: "Sub category deleted",
    };
  } catch (error) {
    return {
      error: "Failed to delete sub category",
    };
  }
};
