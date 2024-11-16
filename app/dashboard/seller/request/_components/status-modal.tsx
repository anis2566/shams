"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SellerStatus } from "@prisma/client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useSellerStatus } from "@/hooks/use-seller"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingButton } from "@/components/loading-button"
import { useUpdateSellerStatusMutation } from "../../mutation"


const formSchema = z.object({
    status: z
        .nativeEnum(SellerStatus)
        .refine((data) => Object.values(SellerStatus).includes(data), {
            message: "required",
        }),
})

export const SellerStatusModal = () => {
    const { open, id, onClose } = useSellerStatus()

    const { mutate, isPending } = useUpdateSellerStatusMutation({ onClose })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: undefined,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        mutate({ id, status: values.status })
    }

    return (
        <Dialog open={open && !!id} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Status</DialogTitle>
                    <DialogDescription>
                        Change the status of the seller
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                Object.values(SellerStatus).map((status) => (
                                                    <SelectItem key={status} value={status} disabled={status === SellerStatus.Pending}>{status}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <LoadingButton
                            isLoading={isPending}
                            title="Update"
                            loadingTitle="Updating..."
                            onClick={form.handleSubmit(onSubmit)}
                            type="submit"
                        />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}