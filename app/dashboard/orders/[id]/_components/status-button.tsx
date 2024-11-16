"use client";

import { OrderStatus } from "@prisma/client";
import { RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button";

import { useOrderStatus } from "@/hooks/use-order";

interface StatusButtonProps {
    status: OrderStatus;
    id: string;
}

export const StatusButton = ({ status, id }: StatusButtonProps) => {
    const { onOpen: onOpenOrderStatus } = useOrderStatus();

    return (
        <Button variant="outline" disabled={status === OrderStatus.Delivered || status === OrderStatus.Cancelled} className="flex items-center gap-x-3" onClick={() => onOpenOrderStatus(id)}>
            <RefreshCcw className="h-4 w-4" />
            <p>Change Status</p>
        </Button>
    )
}