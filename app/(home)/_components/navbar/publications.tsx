"use client";

import Link from "next/link";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetPublications } from "../../query";
import { cn } from "@/lib/utils";

export const Publications = () => {
    const { data, isLoading } = useGetPublications();

    if (isLoading) return <PublicationsSkeleton />;

    return (
        <div className="md:w-[1300px] h-[500px] flex flex-col justify-between">
            <div className="grid gap-3 p-4 grid-cols-4">
                {
                    data?.map((publication) => (
                        <Link href={`/books?publication=${publication.id}`} className="flex items-center gap-x-2 hover:text-muted-foreground transition-colors" key={publication.name}>
                            {publication.imageUrl && <Image src={publication.imageUrl} alt={publication.name} width={20} height={20} className="rounded-full" />}
                            <p className="truncate">{publication.name}</p>
                        </Link>
                    ))
                }
            </div>
            <Link href="/books/publications" className={cn(buttonVariants({ variant: "link" }), "flex justify-center")}>আরো দেখুন</Link>
        </div>
    )
}


export const PublicationsSkeleton = () => {
    return (
        <div className="md:w-[1300px] h-[500px]">
            <div className="grid gap-3 p-4 grid-cols-4">
                {
                    Array.from({ length: 16 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-x-2 hover:text-muted-foreground transition-colors">
                            <Skeleton className="w-8 h-8 rounded-full" />
                            <Skeleton className="w-20 h-4" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
