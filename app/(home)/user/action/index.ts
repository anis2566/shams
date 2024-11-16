"use server";

import { Gender } from "@prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

import { db } from "@/lib/prisma";
import { saltAndHashPassword } from "@/lib/utils";
import { ReviewSchema } from "@/schema/review.schema";
import { ReviewSchemaType } from "@/schema/review.schema";
import { GET_USER } from "@/services/user.service";
import { getReviewDataInclude } from "@/lib/types";

type UpdateUserInfoActionProps = {
  id: string;
  name: string;
  gender?: Gender;
  dob?: Date;
};

export const UPDATE_USER_INFO_ACTION = async ({
  id,
  name,
  gender,
  dob,
}: UpdateUserInfoActionProps) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    await db.user.update({
      where: { id },
      data: { name, gender, dob },
    });

    revalidatePath("/user/profile");

    return {
      success: "User info updated.",
    };
  } catch (error) {
    return {
      error: "Failed to update user info",
    };
  }
};

type UpdateUserAccountActionProps = {
  id: string;
  email: string;
  phone?: string;
};

export const UPDATE_USER_ACCOUNT_ACTION = async ({
  id,
  email,
  phone,
}: UpdateUserAccountActionProps) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    await db.user.update({
      where: { id },
      data: { email, phone },
    });

    revalidatePath("/user/profile");

    return {
      success: "User account updated.",
    };
  } catch (error) {
    return {
      error: "Failed to update user account",
    };
  }
};

type UpdateUserAvatarActionProps = {
  id: string;
  image: string;
};

export const UPDATE_USER_AVATAR_ACTION = async ({
  id,
  image,
}: UpdateUserAvatarActionProps) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    await db.user.update({
      where: { id },
      data: { image },
    });

    revalidatePath("/user/profile");

    return {
      success: "User avatar updated.",
    };
  } catch (error) {
    return {
      error: "Failed to update user avatar",
    };
  }
};

type UpdateUserPasswordActionProps = {
  id: string;
  oldPassword: string;
  password: string;
};

export const UPDATE_USER_PASSWORD_ACTION = async ({
  id,
  oldPassword,
  password,
}: UpdateUserPasswordActionProps) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    const isPasswordMatch = user.password
      ? await bcrypt.compare(oldPassword, user.password)
      : false;

    if (!isPasswordMatch) {
      return {
        error: "Invalid old password",
      };
    }

    const hashedPassword = saltAndHashPassword(password);

    await db.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    revalidatePath("/user/profile");

    return {
      success: "User password updated.",
    };
  } catch (error) {
    return {
      error: "Failed to update user password",
    };
  }
};

type CreateReviewActionProps = {
  values: ReviewSchemaType;
  bookId: string;
};

export const CREATE_REVIEW_ACTION = async ({
  values,
  bookId,
}: CreateReviewActionProps) => {
  const { data, success } = ReviewSchema.safeParse(values);

  if (!success) {
    return {
      error: "Invlaid input values",
    };
  }

  try {
    const { userId } = await GET_USER();

    const review = await db.review.create({
      data: {
        userId: userId,
        bookId: bookId,
        ...data,
      },
      include: getReviewDataInclude(),
    });

    const totalReviews = await db.review.count({
      where: {
        bookId: bookId,
      },
    });

    const averageRating = await db.review.aggregate({
      _avg: {
        rating: true,
      },
    });

    const avgRating = averageRating._avg.rating ?? 0;
    const newRating =
      Math.floor(
        ((avgRating * (totalReviews - 1) + data.rating) / totalReviews) * 2,
      ) / 2;

    await db.book.update({
      where: {
        id: bookId,
      },
      data: {
        rating: newRating,
        totalReview: {
          increment: 1,
        },
      },
    });

    revalidatePath(`/user/reviews`);

    return {
      success: "Review submitted",
      review,
    };
  } catch (error) {
    return {
      error: "Failed to create review",
    };
  }
};
