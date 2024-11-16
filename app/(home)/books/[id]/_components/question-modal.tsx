"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { LoadingButton } from "@/components/loading-button";
import { QuestionSchema, QuestionSchemaType } from "@/schema/question.schema";
import { useCreateQuestionMutation } from "../../mutation";
import { useQuestion } from "@/hooks/use-question";

export const QuestionModal = () => {
    const { open, id, onClose } = useQuestion();

    useEffect(() => {
        if (open) {
            form.reset({
                question: "",
                bookId: id,
            });
        }
    }, [open]);

    const form = useForm<QuestionSchemaType>({
        resolver: zodResolver(QuestionSchema),
        defaultValues: {
            question: "",
            bookId: id,
        },
    });

    const { mutate: createQuestion, isPending } = useCreateQuestionMutation({ onClose, form, bookId: id });

    const onSubmit = (values: QuestionSchemaType) => {
        createQuestion(values);
    }


    return (
        <Dialog open={open || !!id} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ask a question</DialogTitle>
                    <DialogDescription>
                        Ask a question about this book
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Question</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Ask a question about this book" rows={5} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <LoadingButton
                            type="submit"
                            className="w-full"
                            isLoading={isPending}
                            title="Submit"
                            loadingTitle="Submitting..."
                            onClick={form.handleSubmit(onSubmit)}
                        />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
};
