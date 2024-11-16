"use client"

import { Review, Book, User } from "@prisma/client";
import { Trash2, MoreVerticalIcon } from "lucide-react";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

import { useDeleteReview } from "@/hooks/use-review";

interface ReviewWithBookAndUser extends Review {
    book: Book;
    user: User;
}

interface ReviewListProps {
    reviews: ReviewWithBookAndUser[];
}

export const ReviewList = ({ reviews }: ReviewListProps) => {
    const { onOpen: onOpenDeleteReview } = useDeleteReview();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reviews.map((review) => (
                    <TableRow key={review.id}>
                        <TableCell>{review.book.name.length > 40 ? `${review.book.name.slice(0, 40)}...` : review.book.name}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-x-3">
                                <Avatar>
                                    <AvatarImage src={review.user.image || ""} alt={review.user.name || ""} />
                                    <AvatarFallback>
                                        {review.user.name?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p>{review.user.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {review.user.email}
                                    </p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{review.rating}</TableCell>
                        <TableCell>{review.content.length > 40 ? `${review.content.slice(0, 40)}...` : review.content}</TableCell>
                        <TableCell>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreVerticalIcon className="w-4 h-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent side="right" className="p-2 max-w-[180px]">
                                    <Button variant="ghost" className="flex items-center justify-start gap-x-2 w-full text-red-500 hover:text-red-400" onClick={() => onOpenDeleteReview(review.id)}>
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
