"use client";

import { Answer, Book, Question, User } from "@prisma/client";
import { MessageCircleReply, Trash2, MoreVerticalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

import { useQuestionDelete, useQuestionReply } from "@/hooks/use-question";

interface QuestionWithRelations extends Question {
    book: Book;
    answers: Answer[];
    user: User;
}

interface QuestionListProps {
    questions: QuestionWithRelations[];
}

export const QuestionList = ({ questions }: QuestionListProps) => {
    const { onOpen } = useQuestionReply();
    const { onOpen: onOpenDelete } = useQuestionDelete();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Book</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Answers</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {questions.map((question) => (
                    <TableRow key={question.id}>
                        <TableCell>{question.user.name}</TableCell>
                        <TableCell>{question.book.name}</TableCell>
                        <TableCell>{question.question}</TableCell>
                        <TableCell>{question.answers.length}</TableCell>
                        <TableCell>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreVerticalIcon className="w-4 h-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent side="right" className="p-2 max-w-[180px]">
                                    <Button variant="ghost" className="flex items-center justify-start gap-x-2 w-full" onClick={() => onOpen(question.id)}>
                                        <MessageCircleReply className="w-4 h-4 mr-2" />
                                        Reply
                                    </Button>
                                    <Button variant="ghost" className="flex items-center justify-start gap-x-2 w-full text-red-500 hover:text-red-400" onClick={() => onOpenDelete(question.id)}>
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