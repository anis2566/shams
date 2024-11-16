"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { CheckIcon, Loader, PlusCircle, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { BookStatus, Language } from "@prisma/client";
import Link from "next/link";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Editor } from "@/components/editor";
import { EDITIONS } from "@/constant";
import { BookSchema, BookSchemaType } from "@/schema/book.schema";
import { UploadButton } from "@/lib/uploadthing";
import { LoadingButton } from "@/components/loading-button";
import { useGetAuthorsForBooksQuery, useGetCategoriesForBooksQuery, useGetPublishersForBooksQuery, useGetSubCategoriesForBooksQuery } from "@/app/dashboard/books/query";
import { useNewAuthor } from "@/hooks/use-authro";
import { useNewCategory } from "@/hooks/use-category";
import { useNewSubCategory } from "@/hooks/use-sub-category";
import { useNewPublication } from "@/hooks/use-publication";
import { useCreateBookMutation } from "../../mutation";

export const BookForm = () => {
    const [authorSearch, setAuthorSearch] = useState<string>("");
    const [selectedAuthor, setSelectedAuthor] = useState<string>("");
    const [categorySearch, setCategorySearch] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [publisherSearch, setPublisherSearch] = useState<string>("");
    const [selectedPublisher, setSelectedPublisher] = useState<string>("");
    const [subCategorySearch, setSubCategorySearch] = useState<string>("");
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

    const { onOpen: onOpenNewAuthor } = useNewAuthor();
    const { onOpen: onOpenNewCategory } = useNewCategory();
    const { onOpen: onOpenNewSubCategory } = useNewSubCategory();
    const { onOpen: onOpenNewPublication } = useNewPublication();

    const { mutate, isPending } = useCreateBookMutation();

    const { data: authors, isLoading } = useGetAuthorsForBooksQuery(authorSearch);
    const { data: categories, isLoading: categoriesLoading } = useGetCategoriesForBooksQuery(categorySearch);
    const { data: publishers, isLoading: publishersLoading } = useGetPublishersForBooksQuery(publisherSearch);

    const form = useForm<BookSchemaType>({
        resolver: zodResolver(BookSchema),
        defaultValues: {
            name: "",
            shortDescription: "",
            description: "",
            price: undefined,
            discountPrice: undefined,
            imageUrl: "",
            length: undefined,
            edition: "",
            isbn: undefined,
            authorId: "",
            categoryId: "",
            subCategoryId: undefined,
            publicationId: "",
            status: BookStatus.Unpublished,
            stock: undefined,
        },
    });

    const { data: subCategories, isLoading: subCategoriesLoading } = useGetSubCategoriesForBooksQuery(form.watch("categoryId"), subCategorySearch);

    const onSubmit = (values: BookSchemaType) => {
        mutate(values);
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Book Information</CardTitle>
                            <CardDescription>
                                Add book information to the book.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                                name="shortDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Short Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Editor {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stock</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="language"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Language</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select language" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    Object.values(Language).map((language) => (
                                                        <SelectItem key={language} value={language}>{language}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Book Specification</CardTitle>
                            <CardDescription>
                                Add book specification to the book.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="length"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pages</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="edition"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Edition</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select edition" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    EDITIONS.map((edition) => (
                                                        <SelectItem key={edition} value={edition}>{edition}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="isbn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ISBN</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Thumbnail</CardTitle>
                            <CardDescription>
                                Add thumbnail to the book.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            {form.getValues("imageUrl") ? (
                                                <div className="relative aspect-square max-h-[150px]">
                                                    <Image
                                                        alt="Upload"
                                                        fill
                                                        className="w-full h-full object-contain"
                                                        src={form.getValues("imageUrl")}
                                                        onError={() => form.setValue("imageUrl", "")}
                                                    />
                                                    <Button
                                                        className="absolute right-0 top-0"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => form.setValue("imageUrl", "")}
                                                        type="button"
                                                        disabled={isPending}
                                                    >
                                                        <Trash2Icon className="text-rose-500" />
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
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Author</CardTitle>
                            <CardDescription>
                                Add author to the book.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="authorId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <Popover>
                                            <FormControl>
                                                <PopoverTrigger asChild>
                                                    <Button type="button" variant="outline" disabled={isPending} className="flex justify-start">
                                                        {selectedAuthor ? selectedAuthor : "Select author"}
                                                    </Button>
                                                </PopoverTrigger>
                                            </FormControl>
                                            <PopoverContent align="start" className="w-[300px] md:w-[580px] space-y-3">
                                                <Input
                                                    placeholder="Search author"
                                                    type="search"
                                                    onChange={(e) => setAuthorSearch(e.target.value)}
                                                />

                                                <div className="flex flex-col gap-1">
                                                    {
                                                        isLoading && (
                                                            <Loader className="animate-spin flex mx-auto mt-3" />
                                                        )
                                                    }
                                                    {
                                                        !isLoading && authors?.map((author) => (
                                                            <div key={author.id} className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-100 rounded-md" onClick={() => {
                                                                setSelectedAuthor(author.name);
                                                                field.onChange(author.id);
                                                            }}>
                                                                <div className="flex items-center gap-2">
                                                                    <p>{author.name}</p>
                                                                </div>
                                                                {
                                                                    selectedAuthor === author.name && (
                                                                        <CheckIcon className="text-green-500" />
                                                                    )
                                                                }
                                                            </div>
                                                        ))
                                                    }
                                                    {
                                                        !isLoading && authors?.length === 0 && (
                                                            <p className="text-sm text-gray-500 text-center">No authors found</p>
                                                        )
                                                    }

                                                    <div className="flex items-center justify-center gap-x-2">
                                                        <p className="text-sm text-gray-500">Don&apos;t see your author?</p>
                                                        <Button type="button" variant="secondary" disabled={isPending} onClick={onOpenNewAuthor}>
                                                            <PlusCircle className="w-4 h-4 mr-2" />
                                                            <span>Add New</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Category</CardTitle>
                            <CardDescription>
                                Add category to the book.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <Popover>
                                            <FormControl>
                                                <PopoverTrigger asChild>
                                                    <Button type="button" variant="outline" disabled={isPending} className="flex justify-start">
                                                        {selectedCategory ? selectedCategory : "Select category"}
                                                    </Button>
                                                </PopoverTrigger>
                                            </FormControl>
                                            <PopoverContent align="start" className="w-[300px] md:w-[580px] space-y-3">
                                                <Input
                                                    placeholder="Search category"
                                                    type="search"
                                                    onChange={(e) => setCategorySearch(e.target.value)}
                                                />

                                                <div className="flex flex-col gap-1">
                                                    {
                                                        isLoading && (
                                                            <Loader className="animate-spin flex mx-auto mt-3" />
                                                        )
                                                    }
                                                    {
                                                        !categoriesLoading && categories?.map((category) => (
                                                            <div key={category.id} className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-100 rounded-md" onClick={() => {
                                                                setSelectedCategory(category.name);
                                                                field.onChange(category.id);
                                                            }}>
                                                                <div className="flex items-center gap-2">
                                                                    <p>{category.name}</p>
                                                                </div>
                                                                {
                                                                    selectedCategory === category.name && (
                                                                        <CheckIcon className="text-green-500" />
                                                                    )
                                                                }
                                                            </div>
                                                        ))
                                                    }
                                                    {
                                                        !categoriesLoading && categories?.length === 0 && (
                                                            <p className="text-sm text-gray-500 text-center">No categories found</p>
                                                        )
                                                    }

                                                    <div className="flex items-center justify-center gap-x-2">
                                                        <p className="text-sm text-gray-500">Don&apos;t see your category?</p>
                                                        <Button type="button" variant="secondary" disabled={isPending} onClick={onOpenNewCategory}>
                                                            <PlusCircle className="w-4 h-4 mr-2" />
                                                            <span>Add New</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="subCategoryId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <Popover>
                                            <FormControl>
                                                <PopoverTrigger asChild>
                                                    <Button type="button" variant="outline" disabled={isPending || !selectedCategory} className="flex justify-start">
                                                        {selectedSubCategory ? selectedSubCategory : "Select sub-category"}
                                                    </Button>
                                                </PopoverTrigger>
                                            </FormControl>
                                            <PopoverContent align="start" className="w-[300px] md:w-[580px] space-y-3">
                                                <Input
                                                    placeholder="Search publication"
                                                    type="search"
                                                    onChange={(e) => setSubCategorySearch(e.target.value)}
                                                />

                                                <div className="flex flex-col gap-1">
                                                    {
                                                        isLoading && (
                                                            <Loader className="animate-spin flex mx-auto mt-3" />
                                                        )
                                                    }
                                                    {
                                                        !subCategoriesLoading && subCategories?.map((subCategory) => (
                                                            <div key={subCategory.id} className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-100 rounded-md" onClick={() => {
                                                                setSelectedSubCategory(subCategory.name);
                                                                field.onChange(subCategory.id);
                                                            }}>
                                                                <div className="flex items-center gap-2">
                                                                    <p>{subCategory.name}</p>
                                                                </div>
                                                                {
                                                                    selectedSubCategory === subCategory.name && (
                                                                        <CheckIcon className="text-green-500" />
                                                                    )
                                                                }
                                                            </div>
                                                        ))
                                                    }
                                                    {
                                                        !subCategoriesLoading && subCategories?.length === 0 && (
                                                            <p className="text-sm text-gray-500 text-center">No sub-categories found</p>
                                                        )
                                                    }

                                                    <div className="flex items-center justify-center gap-x-2">
                                                        <p className="text-sm text-gray-500">Don&apos;t see your sub-category?</p>
                                                        <Button type="button" variant="secondary" disabled={isPending || !selectedCategory} onClick={() => form.watch("categoryId") && onOpenNewSubCategory(form.watch("categoryId"))}>
                                                            <PlusCircle className="w-4 h-4 mr-2" />
                                                            <span>Add New</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Publication</CardTitle>
                            <CardDescription>
                                Add publication to the book.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="publicationId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col gap-2">
                                        <Popover>
                                            <FormControl>
                                                <PopoverTrigger asChild>
                                                    <Button type="button" variant="outline" disabled={isPending} className="flex justify-start">
                                                        {selectedPublisher ? selectedPublisher : "Select publication"}
                                                    </Button>
                                                </PopoverTrigger>
                                            </FormControl>
                                            <PopoverContent align="start" className="w-[300px] md:w-[580px] space-y-3">
                                                <Input
                                                    placeholder="Search publication"
                                                    type="search"
                                                    onChange={(e) => setPublisherSearch(e.target.value)}
                                                />

                                                <div className="flex flex-col gap-1">
                                                    {
                                                        isLoading && (
                                                            <Loader className="animate-spin flex mx-auto mt-3" />
                                                        )
                                                    }
                                                    {
                                                        !publishersLoading && publishers?.map((publisher) => (
                                                            <div key={publisher.id} className="flex items-center justify-between cursor-pointer p-1 hover:bg-gray-100 rounded-md" onClick={() => {
                                                                setSelectedPublisher(publisher.name);
                                                                field.onChange(publisher.id);
                                                            }}>
                                                                <div className="flex items-center gap-2">
                                                                    <p>{publisher.name}</p>
                                                                </div>
                                                                {
                                                                    selectedPublisher === publisher.name && (
                                                                        <CheckIcon className="text-green-500" />
                                                                    )
                                                                }
                                                            </div>
                                                        ))
                                                    }
                                                    {
                                                        !publishersLoading && publishers?.length === 0 && (
                                                            <p className="text-sm text-gray-500 text-center">No publications found</p>
                                                        )
                                                    }

                                                    <div className="flex items-center justify-center gap-x-2">
                                                        <p className="text-sm text-gray-500">Don&apos;t see your publication?</p>
                                                        <Button type="button" variant="secondary" disabled={isPending} onClick={onOpenNewPublication}>
                                                            <PlusCircle className="w-4 h-4 mr-2" />
                                                            <span>Add New</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pricing</CardTitle>
                            <CardDescription>
                                Add pricing to the book.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="discountPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discount Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Demo PDF</CardTitle>
                            <CardDescription>
                                Add demo pdf to the book.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="demoPdfUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            {form.getValues("demoPdfUrl") ? (
                                                <div className="relative">
                                                    <Link href={form.getValues("demoPdfUrl") || ""} target="_blank" className="text-center hover:underline">PDF Preview</Link>
                                                    <Button
                                                        className="absolute right-0 top-0"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => form.setValue("demoPdfUrl", "")}
                                                        type="button"
                                                        disabled={isPending}
                                                    >
                                                        <Trash2Icon className="text-rose-500" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <UploadButton
                                                    endpoint="pdfUploader"
                                                    onClientUploadComplete={(res) => {
                                                        field.onChange(res[0].url);
                                                        toast.success("PDF uploaded");
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        toast.error("PDF upload failed");
                                                    }}
                                                    disabled={isPending}
                                                />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <LoadingButton
                        isLoading={isPending}
                        title="Create"
                        loadingTitle="Creating..."
                        onClick={form.handleSubmit(onSubmit)}
                        type="submit"
                    />
                </div>
            </form>
        </Form>
    )
};
