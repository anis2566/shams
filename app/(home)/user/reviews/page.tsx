import { Metadata } from "next";
import { OrderStatus } from "@prisma/client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { db } from "@/lib/prisma";
import { GET_USER } from "@/services/user.service";
import { NotReviewList } from "./_components/not-review-list";
import { ReviewList } from "./_components/review-list";
import { CustomPagination } from "@/components/custom-pagination";

export const metadata: Metadata = {
    title: "BookGhor | Reviews",
    description: "Reviews page.",
};

interface Props {
    searchParams: {
        page?: string;
    }
}

const Reviews = async ({ searchParams }: Props) => {
    const { page } = searchParams;

    const pageNumber = parseInt(page || "1");
    const perPage = 5;

    const { user } = await GET_USER();

    const books = await db.book.findMany({
        where: {
            orderItems: {
                some: {
                    order: {
                        userId: user.id,
                        status: OrderStatus.Delivered,
                    },
                    book: {
                        reviews: {
                            none: {
                                userId: user.id,
                            },
                        },
                    },
                },
            }
        },
        include: {
            author: true,
        },
    });

    const [reviews, totalReviews] = await Promise.all([
        db.review.findMany({
            where: {
                userId: user.id,
            },
            include: {
                book: true,
            },
            skip: (pageNumber - 1) * perPage,
            take: perPage,
            orderBy: {
                createdAt: "desc",
            },
        }),
        db.review.count({
            where: {
                userId: user.id,
            },
        }),
    ]);

    const totalPages = Math.ceil(totalReviews / perPage);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Reviews</CardTitle>
                <CardDescription>Your reviews on books.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="not-reviewed" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="not-reviewed">Not Reviewed</TabsTrigger>
                        <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="not-reviewed">
                        <NotReviewList books={books} />
                    </TabsContent>
                    <TabsContent value="reviewed">
                        <ReviewList reviews={reviews} />
                        <CustomPagination totalPages={totalPages} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

export default Reviews
