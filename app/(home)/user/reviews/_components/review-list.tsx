import { Review, Book } from "@prisma/client";

import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";

interface ReviewWithBook extends Review {
    book: Book;
}

interface Props {
    reviews: ReviewWithBook[];
}

export const ReviewList = ({ reviews }: Props) => {

    if (reviews.length === 0) {
        return <div className="h-[20vh] flex items-center justify-center italic text-muted-foreground">No reviews found</div>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Review</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reviews.map((review) => (
                    <TableRow key={review.id}>
                        <TableCell>{review.book.name}</TableCell>
                        <TableCell>{review.rating}</TableCell>
                        <TableCell>{review.content}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
};
