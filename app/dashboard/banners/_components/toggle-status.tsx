"use client";

import { BannerStatus } from "@prisma/client";

import { Switch } from "@/components/ui/switch"

import { useToggleBannerStatusMutation } from "../mutation";


interface Props {
    id: string;
    status: BannerStatus;
}

export const ToggleStatus = ({ id, status }: Props) => {
    const { mutate, isPending } = useToggleBannerStatusMutation();

    const handleToggle = () => {
        mutate({ id, status: status === BannerStatus.Active ? BannerStatus.Inactive : BannerStatus.Active });
    }

    return (
        <Switch id={id} checked={status === BannerStatus.Active} onCheckedChange={handleToggle} disabled={isPending} />
    )
}
