"use server"

import nodemailer from "nodemailer";

import { db } from "@/lib/prisma";
import { saltAndHashPassword } from "@/lib/utils";

export const RESET_PASSWORD = async (email: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        }
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Forgot Password",
        text: "Verification",
        html: `Your verification code is <h1>${code}</h1>`,
    };

    try {
        const user = await db.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return {
                error: "User not found"
            };
        }

        if (user && !user.password) {
            return {
                error: "You did not set a password for this account. Please try continuing with your email method."
            };
        }

        const token = await db.verificationToken.findFirst({
            where: {
                identifier: user.id,
            },
        });

        if (token) {
            await db.verificationToken.delete({
                where: {
                    id: token.id,
                },
            });
        }

        const res = await transporter.sendMail(mailOptions);

        if (res.messageId) {
            await db.verificationToken.create({
                data: {
                    identifier: user.id,
                    token: code,
                    expires: new Date(Date.now() + 30 * 60 * 1000),
                },
            });
        }

        return { success: "Email sent successfully", id: user.id };
    } catch (error) {
        console.log(error);
        return { error: "Email sending failed" };
    }

}

interface Props {
    id: string;
    code: string;
}

export const VERIFY_FORGOT_PASSWORD = async ({ id, code }: Props) => {
    const token = await db.verificationToken.findFirst({
        where: {
            identifier: id,
        },
    });

    if (!token) {
        return {
            error: "Invalid verification code or expired"
        }
    }

    if (token.expires < new Date()) {
        return {
            error: "Invalid verification code or expired"
        }
    }

    console.log(code, token.token)

    if (code !== token.token) {
        return {
            error: "Invalid verification code or expired"
        }
    }

    return {
        success: "Verification successful",
        id: token.identifier,
    };
}


interface PasswordProps {
    id: string;
    password: string;
}

export const CHANGE_PASSWORD = async ({ id, password }: PasswordProps) => {
    try {
        const user = await db.user.findUnique({
            where: { id },
        });

        if (!user) {
            return {
                error: "User not found"
            }
        }

        const hashedPassword = saltAndHashPassword(password);

        await db.user.update({
            where: { id },
            data: { password: hashedPassword },
        });

        return {
            success: "Password changed successfully"
        }

    } catch (error) {
        console.log(error);
        return {
            error: "Password change failed"
        }
    }
}

