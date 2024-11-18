"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { LoadingButton } from "@/components/loading-button";
import { useBookGenre } from "@/hooks/use-book";
import { useChangeBookGenreMutation } from "../mutation";
import { BookGenre } from "@/constant";

const formSchema = z.object({
    genre: z.nativeEnum(BookGenre)
        .refine((val) => Object.values(BookGenre).includes(val), {
            message: "required",
        }),
});

export const BookGenreModal = () => {
    const { open, id, onClose } = useBookGenre();

    const { mutate, isPending } = useChangeBookGenreMutation({ onClose });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            genre: undefined,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        mutate({ id, genre: values.genre });
    };

    return (
        <Dialog open={open && !!id} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Book Genre</DialogTitle>
                    <DialogDescription>Change the genre of the book</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="genre"
                            render={({ field }) => (
                                <FormItem>
                                    <Select
                                        {...field}
                                        onValueChange={(value) => field.onChange(value as BookGenre)}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Genre" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(BookGenre).map((genre) => (
                                                <SelectItem key={genre} value={genre}>
                                                    {genre}
                                                </SelectItem>
                                            ))}
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
};
