"use client";

import { Subscriber } from "@prisma/client";
import { MoreVerticalIcon, Trash2 } from "lucide-react";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { useSubscriber } from "@/hooks/use-subscriber";

interface SubscriberListProps {
    subscribers: Subscriber[];
}

export const SubscriberList = ({ subscribers }: SubscriberListProps) => {
    const { onOpen } = useSubscriber();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {subscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                        <TableCell>{subscriber.email}</TableCell>
                        <TableCell>{subscriber.createdAt.toLocaleDateString()}</TableCell>
                        <TableCell>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreVerticalIcon className="w-4 h-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent side="right" className="p-2 max-w-[180px]">
                                    <Button variant="ghost" className="flex items-center justify-start gap-x-2 w-full text-red-500 hover:text-red-400" onClick={() => onOpen(subscriber.id)}>
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