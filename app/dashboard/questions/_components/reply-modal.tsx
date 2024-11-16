"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { LoadingButton } from "@/components/loading-button"

import { useQuestionReply } from "@/hooks/use-question"
import { useReplyQuestionMutation } from "../mutation"

const ReplySchema = z.object({
    answer: z.string().min(1, { message: "Reply is required" })
})


export const ReplyModal = () => {
    const { open, id, onClose } = useQuestionReply()

    const { mutate, isPending } = useReplyQuestionMutation({ onClose })

    const form = useForm<z.infer<typeof ReplySchema>>({
        resolver: zodResolver(ReplySchema),
        defaultValues: {
            answer: ""
        },
    })

    function onSubmit(values: z.infer<typeof ReplySchema>) {
        mutate({
            id,
            answer: values.answer
        })
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reply Question</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="answer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reply</FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} placeholder="Enter your reply..." {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <LoadingButton
                            type="submit"
                            isLoading={isPending}
                            title="Reply"
                            loadingTitle="Replying..."
                            onClick={() => form.handleSubmit(onSubmit)}
                        />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}