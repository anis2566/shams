"use client";

import { Banner } from "@prisma/client";
import { Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useBanner } from "@/hooks/use-banner";
import { ToggleStatus } from "./toggle-status";


interface Props {
    banners: Banner[];
}

export const BannerList = ({ banners }: Props) => {
    const { onOpen } = useBanner();

    return (
        <div className="w-full grid md:grid-cols-2 gap-6">
            {banners.map((banner) => (
                <div key={banner.id}>
                    <div className="relative aspect-video max-h-[300px]">
                        <Image src={banner.imageUrl} alt={banner.id} fill className="object-cover" />
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Button variant="destructive" size="icon" onClick={() => onOpen(banner.id)}>
                            <Trash className="w-4 h-4" />
                        </Button>
                        <ToggleStatus id={banner.id} status={banner.status} />
                    </div>
                </div>
            ))}
        </div>
    )
};
