"use client";

import { Author, Book, } from "@prisma/client";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useCreateReview } from "@/hooks/use-review";

interface BookWithRelation extends Book {
    author: Author;
}

interface Props {
    books: BookWithRelation[];
}

export const NotReviewList = ({ books }: Props) => {
    const { onOpen } = useCreateReview();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {books.map((book) => (
                    <TableRow key={book.id}>
                        <TableCell className="hover:underline">
                            <Link href={`/books/${book.id}`}>
                                {book.name}
                            </Link>
                        </TableCell>
                        <TableCell>{book.author.name}</TableCell>
                        <TableCell>
                            <Button onClick={() => onOpen(book.id)}>Review</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
};
