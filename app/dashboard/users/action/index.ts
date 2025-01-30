"use server";

import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { GET_ROLE } from "@/services/user.service";

interface UpdateUserRoleProps {
    id: string;
    role: Role;
}

export const updateUserRole = async ({ id, role }: UpdateUserRoleProps) => {
    const { isAdmin } = await GET_ROLE();

    if (!isAdmin) {
        return {
            error: "Permission denied",
        };
    }

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
            data: { role },
        });

        revalidatePath("/dashboard/users");

        return {
            success: "User role updated",
        };
    } catch (error) {
        return {
            error: "Failed to update user role",
        };
    }
};


export const DELETE_USER_ACTION = async (id: string) => {
    const { isAdmin } = await GET_ROLE();

    if (!isAdmin) {
        return {
            error: "Permission denied",
        };
    }

    try {
        const user = await db.user.findUnique({ where: { id } });

        if (!user) {
            return { error: "User not found" };
        }

        await db.user.delete({ where: { id } });

        revalidatePath("/dashboard/users");

        return { success: "User deleted" };
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to delete user",
        };
    }
};