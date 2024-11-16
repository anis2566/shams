"use client"

import { CategoryStatus, SubCategory } from "@prisma/client";
import { BookOpen, Pen, Trash2, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useSubCategory } from "@/hooks/use-sub-category";
import { EmptyData } from "@/components/empty-data";

interface SubCategoryWithBooks extends SubCategory {
    books: { id: string }[];
}

interface Props {
    subCategories: SubCategoryWithBooks[];
    categoryId: string;
}

export const SubCategoryList = ({ subCategories, categoryId }: Props) => {
    const { onOpen } = useSubCategory();

    if (subCategories.length === 0) {
        return (
            <EmptyData title="No sub categories found" />
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Books</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {subCategories.map((subCategory) => (
                    <TableRow key={subCategory.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={subCategory.imageUrl ?? ""} />
                                <AvatarFallback>
                                    {subCategory.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{subCategory.name}</TableCell>
                        <TableCell>{subCategory.books.length}</TableCell>
                        <TableCell>
                            <Badge className="rounded-full" variant={subCategory.status === CategoryStatus.Active ? "default" : "destructive"}>{subCategory.status}</Badge>
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
                                        <Link href={`/dashboard/categories/${categoryId}/sub/${subCategory.id}`} >
                                            <BookOpen className="h-4 w-4 mr-2" />
                                            View Books
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost" className="flex items-center justify-start gap-x-2 w-full">
                                        <Link href={`/dashboard/categories/${categoryId}/sub/edit/${subCategory.id}`} >
                                            <Pen className="h-4 w-4 mr-2" />
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" className="flex items-center justify-start gap-x-2 w-full text-red-500 hover:text-red-400" onClick={() => onOpen(subCategory.id)}>
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
