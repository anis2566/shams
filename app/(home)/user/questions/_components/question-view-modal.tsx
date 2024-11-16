"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { useQuestionView } from "@/hooks/use-question";
import { BookOpen, ClipboardPen, MessageCircle } from "lucide-react";

export const QuestionViewModal = () => {
    const { open, question, onClose } = useQuestionView();

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Question</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <div className="flex items-center gap-x-2">
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm font-bold">{question?.book.name}</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{question?.question}</span>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        {question?.answers.map((answer) => (
                            <div key={answer.id} className="flex items-center gap-x-2">
                                <ClipboardPen className="h-4 w-4" />
                                <span className="text-sm font-medium">{answer.answer}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
