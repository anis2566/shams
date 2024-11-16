"use client";

import { Author, Book, BookStatus, Category, Publication } from "@prisma/client";
import { MoreVerticalIcon, Pen, Trash2 } from "lucide-react";
import Link from "next/link";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { EmptyData } from "@/components/empty-data";
import { useDeleteSellerBook } from "@/hooks/use-book";

interface BookWithRelations extends Book {
    category: Category;
    author: Author;
    publication: Publication;
}

interface Props {
    books: BookWithRelations[];
}

export const BookList = ({ books }: Props) => {
    const { onOpen } = useDeleteSellerBook();

    if (books.length === 0) {
        return <EmptyData title="No books found" />
    }

    return (
        <Table>
            <TableHeader>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Publisher</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Total Sold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
            </TableHeader>
            <TableBody>
                {books.map((book) => (
                    <TableRow key={book.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={book.imageUrl} alt={book.name} />
                                <AvatarFallback>{book.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{book.name}</TableCell>
                        <TableCell>{book.category.name}</TableCell>
                        <TableCell>{book.author.name}</TableCell>
                        <TableCell>{book.publication.name}</TableCell>
                        <TableCell>{book.price}</TableCell>
                        <TableCell>{book?.discountPrice}</TableCell>
                        <TableCell>{book.stock}</TableCell>
                        <TableCell>{book.totalSold}</TableCell>
                        <TableCell>
                            <Badge variant={book.status === BookStatus.Unpublished ? "destructive" : "default"} className="rounded-full">{book.status}</Badge>
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
                                        <Link href={`/seller/books/edit/${book.id}`} >
                                            <Pen className="w-4 h-4 mr-2" />
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" className="flex items-center justify-start gap-x-2 w-full text-red-500 hover:text-red-400" onClick={() => onOpen(book.id)}>
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
