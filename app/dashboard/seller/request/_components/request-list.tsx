"use client"

import { Seller, User } from "@prisma/client";
import { MoreVerticalIcon, RefreshCcw, Trash2 } from "lucide-react";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge";

import { useSeller, useSellerStatus } from "@/hooks/use-seller";

interface SellerWithUser extends Seller {
    user: User
}

interface RequestListProps {
    sellers: SellerWithUser[]
}

export const RequestList = ({ sellers }: RequestListProps) => {
    const { onOpen } = useSellerStatus()
    const { onOpen: onOpenDelete } = useSeller()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sellers.map((seller) => (
                    <TableRow key={seller.id}>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage src={seller.user.image || ""} />
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">{seller.user.name}</p>
                                    <p className="text-sm text-muted-foreground">{seller.user.email}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{seller.name}</TableCell>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={seller.imageUrl || ""} />
                            </Avatar>
                        </TableCell>
                        <TableCell>{seller.phone}</TableCell>
                        <TableCell>{seller.email}</TableCell>
                        <TableCell>
                            <Badge className="rounded-full">
                                {seller.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="flex items-center justify-center">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreVerticalIcon className="w-4 h-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent side="right" className="p-2 max-w-[180px]">
                                    <Button variant="ghost" onClick={() => onOpen(seller.id)} className="flex items-center justify-start gap-x-2 w-full">
                                        <RefreshCcw className="w-4 h-4 mr-2" />
                                        Change Status
                                    </Button>
                                    <Button variant="ghost" className="flex items-center justify-start gap-x-2 w-full text-red-500 hover:text-red-400" onClick={() => onOpenDelete(seller.id)}>
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