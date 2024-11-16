"use client"

import Link from "next/link";
import { Publication, PublicationStatus } from "@prisma/client";
import { Pen, Trash2, MoreVerticalIcon, BookOpen } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { EmptyData } from "@/components/empty-data";
import { usePublication } from "@/hooks/use-publication";

interface PublicationWithBooks extends Publication {
    books: { id: string }[];
}

interface Props {
    publications: PublicationWithBooks[];
}

export const PublicationList = ({ publications }: Props) => {
    const { onOpen } = usePublication()

    if (publications.length === 0) {
        return <EmptyData title="No publications found" />
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
                {publications.map((publication) => (
                    <TableRow key={publication.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={publication.imageUrl || ""} />
                                <AvatarFallback>
                                    {publication.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{publication.name}</TableCell>
                        <TableCell>{publication.books.length}</TableCell>
                        <TableCell>
                            <Badge className="rounded-full" variant={publication.status === PublicationStatus.Active ? "default" : "destructive"}>{publication.status}</Badge>
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
                                        <Link href={`/dashboard/publications/${publication.id}`} >
                                            <BookOpen className="h-4 w-4 mr-2" />
                                            View Books
                                        </Link>
                                    </Button>
                                    <Button asChild variant="ghost" className="flex items-center justify-start gap-x-2 w-full">
                                        <Link href={`/dashboard/publications/edit/${publication.id}`} >
                                            <Pen className="w-4 h-4 mr-2" />
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" className="flex items-center justify-start gap-x-2 w-full text-red-500 hover:text-red-400" onClick={() => onOpen(publication.id)}>
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
