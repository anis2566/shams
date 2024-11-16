"use client"

import { Seller, SellerStatus } from "@prisma/client";
import { Eye, MoreVerticalIcon, RefreshCcw, Trash2 } from "lucide-react";
import Link from "next/link";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { useSellerDelete, useSellerStatus } from "@/hooks/use-seller";

interface SellerWithBooks extends Seller {
    books: { id: string }[];
}

interface Props {
    sellers: SellerWithBooks[];
}

export const SellerList = ({ sellers }: Props) => {
    const { onOpen } = useSellerStatus()
    const { onOpen: onOpenDelete } = useSellerDelete()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Books</TableHead>
                    <TableHead>Total Sold</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sellers.map((seller) => (
                    <TableRow key={seller.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={seller.imageUrl} alt={seller.name} />
                                <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{seller.name}</TableCell>
                        <TableCell>{seller.phone}</TableCell>
                        <TableCell>{seller.email}</TableCell>
                        <TableCell>{seller.books.length}</TableCell>
                        <TableCell>{seller.totalSold}</TableCell>
                        <TableCell>
                            <Badge variant={seller.status === SellerStatus.Active ? "default" : "destructive"} className="rounded-full">{seller.status}</Badge>
                        </TableCell>
                        <TableCell>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                        <MoreVerticalIcon className="w-4 h-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent side="right" className="p-2 max-w-[180px]">
                                    <Button asChild variant="ghost" className="flex items-center justify-start gap-x-2 w-full">
                                        <Link href={`/dashboard/seller/${seller.id}`} >
                                            <Eye className="w-4 h-4 mr-2" />
                                            View
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" className="flex items-center justify-start gap-x-2 w-full" onClick={() => onOpen(seller.id)}>
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
