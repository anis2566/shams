"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { UploadButton } from "@/lib/uploadthing";
import { LoadingButton } from "@/components/loading-button";
import { useUpdateUserAvatarMutation } from "../../mutation";

const avatarSchema = z.object({
    image: z.string().min(1, { message: "required" }),
});

interface AvatarFormProps {
    user: User;
}

export const AvatarForm = ({ user }: AvatarFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => setIsEditing((prev) => !prev);

    const { mutate, isPending } = useUpdateUserAvatarMutation({
        toggleEditing,
    });

    const form = useForm<z.infer<typeof avatarSchema>>({
        resolver: zodResolver(avatarSchema),
        defaultValues: {
            image: user.image ?? "",
        }
    });

    const onSubmit = (data: z.infer<typeof avatarSchema>) => {
        mutate({
            id: user.id,
            image: data.image,
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center gap-x-2">
                    <span>Avatar</span>
                    <Button variant={isEditing ? "destructive" : "secondary"} onClick={toggleEditing} disabled={isPending}>
                        {isEditing ? "Cancel" : "Update"}
                    </Button>
                </CardTitle>
                <CardDescription>
                    You can edit your avatar here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        {form.getValues("image") && !isEditing ? (
                                            <div className="relative aspect-square max-h-[100px]">
                                                <Image
                                                    alt="Upload"
                                                    fill
                                                    className="rounded-full object-cover"
                                                    src={form.getValues("image") || ""}
                                                />
                                            </div>
                                        ) : (
                                            <UploadButton
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => {
                                                    field.onChange(res[0].url);
                                                    toast.success("Image uploaded");
                                                    toggleEditing();
                                                }}
                                                onUploadError={(error: Error) => {
                                                    toast.error("Image upload failed");
                                                }}
                                            />
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {
                            isEditing && (
                                <LoadingButton
                                    type="submit"
                                    isLoading={isPending}
                                    title="Save"
                                    loadingTitle="Saving..."
                                    onClick={form.handleSubmit(onSubmit)}
                                />
                            )
                        }
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}