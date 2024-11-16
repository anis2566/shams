import { db } from "@/lib/prisma";
import { GET_USER } from "@/services/user.service";
import { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QuestionList } from "./_components/question-list";
import { CustomPagination } from "@/components/custom-pagination";
import { Header } from "@/app/dashboard/questions/_components/header";

export const metadata: Metadata = {
    title: "BookGhor | Questions",
    description: "Questions page.",
};

interface Props {
    searchParams: {
        page?: string;
        perPage?: string;
        sort?: string;
    };
}

const Questions = async ({ searchParams }: Props) => {
    const { page, perPage, sort } = searchParams;

    const itemsPerPage = parseInt(perPage || "10");
    const currentPage = parseInt(page || "1");

    const { user } = await GET_USER();

    const [questions, totalQuestions] = await Promise.all([
        db.question.findMany({
            where: {
                userId: user.id,
            },
            include: {
                book: true,
                answers: true,
            },
            orderBy: {
                createdAt: sort === "asc" ? "asc" : "desc",
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        }),
        db.question.count({
            where: {
                userId: user.id,
            },
        }),
    ]);

    const totalPages = Math.ceil(totalQuestions / itemsPerPage);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Questions</CardTitle>
                <CardDescription>Questions you have asked.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Header />
                <QuestionList questions={questions} />
                <CustomPagination totalPages={totalPages} />
            </CardContent>
        </Card>
    )
}

export default Questions
