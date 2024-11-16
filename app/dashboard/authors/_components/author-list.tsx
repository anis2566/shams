"use client";

import { Author, AuthorStatus } from "@prisma/client";
import { Pen, Trash2, Eye, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { EmptyData } from "@/components/empty-data";
import { useAuthor } from "@/hooks/use-authro";

interface AuthorWithBooks extends Author {
    books: { id: string }[];
}

interface Props {
    authors: AuthorWithBooks[];
}

export const AuthorList = ({ authors }: Props) => {
    const { onOpen } = useAuthor();

    if (authors.length === 0) {
        return <EmptyData title="No authors found" />;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Total Books</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {authors.map((author) => (
                    <TableRow key={author.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={author.imageUrl || ""} alt={author.name} />
                                <AvatarFallback>
                                    {author.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{author.name}</TableCell>
                        <TableCell>{author.email}</TableCell>
                        <TableCell>{author.books.length}</TableCell>
                        <TableCell>{author.totalSold}</TableCell>
                        <TableCell>
                            <Badge className="rounded-full" variant={author.status === AuthorStatus.Pending ? "outline" : author.status === AuthorStatus.Active ? "default" : "destructive"}>{author.status}</Badge>
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
                                        <Link href={`/dashboard/authors/${author.id}`} >
                                            <Eye className="w-4 h-4 mr-2" />
                                            View
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost" className="flex items-center justify-start gap-x-2 w-full">
                                        <Link href={`/dashboard/authors/edit/${author.id}`} >
                                            <Pen className="w-4 h-4 mr-2" />
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" className="flex items-center justify-start gap-x-2 w-full text-red-500 hover:text-red-400" onClick={() => onOpen(author.id)}>
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
}
