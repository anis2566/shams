"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { SellerStatus } from "@prisma/client";
import { CheckIcon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { SellerSchemaAdmin, SellerSchemaAdminType } from "@/schema/seller.schema";
import { useGetUsersForSellerQuery } from "../../query";
import { UploadButton } from "@/lib/uploadthing";
import { LoadingButton } from "@/components/loading-button";
import { useSellerRegisterAdminMutation } from "../../mutation";

export const SellerForm = () => {
    const [selectedUser, setSelectedUser] = useState<string>("");
    const [name, setName] = useState<string>("");

    const { data: users, isLoading } = useGetUsersForSellerQuery(name);
    const { mutate, isPending } = useSellerRegisterAdminMutation();

    const form = useForm<SellerSchemaAdminType>({
        resolver: zodResolver(SellerSchemaAdmin),
        defaultValues: {
            userId: "",
            name: "",
            phone: "",
            email: "",
            imageUrl: "",
            bio: "",
            status: undefined,
        },
    });

    const onSubmit = (data: SellerSchemaAdminType) => {
        mutate(data);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>New  Seller</CardTitle>
                <CardDescription>
                    Add new seller to the system.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel>User</FormLabel>
                                    <Popover>
                                        <FormControl>
                                            <PopoverTrigger asChild>
                                                <Button type="button" variant="outline" disabled={isLoading || isPending} className="flex justify-start">
                                                    {selectedUser ? selectedUser : "Select user"}
                                                </Button>
                                            </PopoverTrigger>
                                        </FormControl>
                                        <PopoverContent align="start" className="w-[300px] md:w-[580px] space-y-3">
                                            <Input
                                                placeholder="Search category"
                                                type="search"
                                                onChange={(e) => setName(e.target.value)}
                                                disabled={isLoading || isPending}
                                            />

                                            <div className="flex flex-col gap-1">
                                                {
                                                    isLoading && (
                                                        <Loader className="animate-spin flex mx-auto mt-3" />
                                                    )
                                                }
                                                {
                                                    !isLoading && users?.map((user) => (
                                                        <div key={user.id} className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-100 rounded-md" onClick={() => {
                                                            setSelectedUser(user.name || "");
                                                            field.onChange(user.id);
                                                        }}>
                                                            <div
                                                                className="flex items-center gap-2"
                                                            >
                                                                <p>{user.name}</p>
                                                            </div>
                                                            {
                                                                field.value === user.id && (
                                                                    <CheckIcon className="text-green-500" />
                                                                )
                                                            }
                                                        </div>
                                                    ))
                                                }
                                                {
                                                    !isLoading && users?.length === 0 && (
                                                        <p className="text-sm text-gray-500 text-center">No users found</p>
                                                    )
                                                }
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        {form.getValues("imageUrl") ? (
                                            <div className="relative">
                                                <Image
                                                    alt="Upload"
                                                    width={80}
                                                    height={80}
                                                    className="h-14 w-14 rounded-full"
                                                    src={form.getValues("imageUrl")}
                                                />
                                                <Button
                                                    className="absolute right-0 top-0"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => form.setValue("imageUrl", "")}
                                                    type="button"
                                                    disabled={isPending}
                                                >
                                                    <Trash2 className="text-rose-500" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <UploadButton
                                                endpoint="imageUploader"
                                                onClientUploadComplete={(res) => {
                                                    field.onChange(res[0].url);
                                                    toast.success("Image uploaded");
                                                }}
                                                onUploadError={(error: Error) => {
                                                    toast.error("Image upload failed");
                                                }}
                                                disabled={isPending}
                                            />
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                Object.values(SellerStatus).map((status) => (
                                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <LoadingButton
                            isLoading={isPending}
                            title="Create"
                            loadingTitle="Creating..."
                            onClick={form.handleSubmit(onSubmit)}
                            type="submit"
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
