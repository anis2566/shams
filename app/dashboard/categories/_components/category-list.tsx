"use client";

import { Category, CategoryStatus } from "@prisma/client";
import { BringToFront, Pen, Trash2, MoreVerticalIcon, BookOpen } from "lucide-react";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { EmptyData } from "@/components/empty-data";
import { useCategory } from "@/hooks/use-category";

interface CategoryWithRelations extends Category {
    books: { id: string }[];
    subCategories: { id: string }[];
}

interface Props {
    categories: CategoryWithRelations[];
}

export const CategoryList = ({ categories }: Props) => {
    const { onOpen } = useCategory();

    if (categories.length === 0) {
        return <EmptyData title="No categories found" />
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Books</TableHead>
                    <TableHead>Sub Categories</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={category.imageUrl} />
                                <AvatarFallback>
                                    {category.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.books.length}</TableCell>
                        <TableCell>{category.subCategories.length}</TableCell>
                        <TableCell>
                            <Badge className="rounded-full" variant={category.status === CategoryStatus.Active ? "default" : "destructive"}>{category.status}</Badge>
                        </TableCell>
                        <TableCell>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreVerticalIcon className="w-4 h-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent side="right" className="p-2 max-w-[180px]">
                                    <Button asChild variant="ghost" className="flex items-center justify-start gap-x-2 w-full">
                                        <Link href={`/dashboard/categories/${category.id}`} >
                                            <BookOpen className="h-4 w-4 mr-2" />
                                            View Books
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost" className="flex items-center justify-start gap-x-2 w-full">
                                        <Link href={`/dashboard/categories/${category.id}/sub`} >
                                            <BringToFront className="w-4 h-4 mr-2" />
                                            Sub Categories
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost" className="flex items-center justify-start gap-x-2 w-full">
                                        <Link href={`/dashboard/categories/edit/${category.id}`} >
                                            <Pen className="w-4 h-4 mr-2" />
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" className="flex items-center justify-start gap-x-2 w-full text-red-500 hover:text-red-400" onClick={() => onOpen(category.id)}>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
};
