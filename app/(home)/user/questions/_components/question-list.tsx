"use client";

import { Question, Book, Answer } from "@prisma/client";
import { Eye } from "lucide-react";
import { EllipsisVertical } from "lucide-react";

import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { useQuestionView } from "@/hooks/use-question";

interface QuestionWithRelation extends Question {
    book: Book;
    answers: Answer[];
}

interface Props {
    questions: QuestionWithRelation[];
}

export const QuestionList = ({ questions }: Props) => {
    const { onOpen } = useQuestionView();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Answers</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {questions.map((question) => (
                    <TableRow key={question.id}>
                        <TableCell>{question.book.name}</TableCell>
                        <TableCell>{question.question}</TableCell>
                        <TableCell>{question.answers.length}</TableCell>
                        <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => onOpen(question)}>
                                <Eye className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}