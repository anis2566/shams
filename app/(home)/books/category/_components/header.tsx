"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useDebounce } from "@/hooks/use-debounce";

export const Header = () => {
    const [search, setSearch] = useState<string>("");
    const [perPage, setPerPage] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchValue = useDebounce(search, 500);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl(
            {
                url: pathname,
                query: {
                    ...params,
                    search: searchValue,
                },
            },
            { skipEmptyString: true, skipNull: true },
        );

        router.push(url);
    }, [searchValue, router, pathname]);

    const handlePerPageChange = (perPage: string) => {
        setPerPage(perPage);
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl(
            {
                url: pathname,
                query: {
                    ...params,
                    perPage,
                },
            },
            { skipNull: true, skipEmptyString: true },
        );

        router.push(url);
    };

    const handleSortChange = (sort: string) => {
        setSort(sort);
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl(
            {
                url: pathname,
                query: {
                    ...params,
                    sort,
                },
            },
            { skipNull: true, skipEmptyString: true },
        );

        router.push(url);
    };

    const handleReset = () => {
        router.push(pathname);
        setSearch("");
        setPerPage("");
        setSort("");
    };

    return (
        <div className="space-y-2 p-2 shadow-sm shadow-primary">

            <div className="flex items-center gap-x-3 justify-between">
                <div className="flex flex-1 items-center gap-x-3">
                    <div className="hidden md:block relative w-full max-w-[300px]">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                    </div>
                    <Select
                        value={sort}
                        onValueChange={(value) => handleSortChange(value)}
                    >
                        <SelectTrigger className="w-full max-w-[100px] md:max-w-[130px]">
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="desc">Newest</SelectItem>
                            <SelectItem value="asc">Oldest</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={perPage || ""}
                        onValueChange={(value) => handlePerPageChange(value)}
                    >
                        <SelectTrigger className="w-full max-w-[100px] md:max-w-[130px]">
                            <SelectValue placeholder="Limit" />
                        </SelectTrigger>
                        <SelectContent>
                            {["5", "10", "20", "50", "100", "200"].map((v, i) => (
                                <SelectItem value={v} key={i}>
                                    {v}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button variant="destructive" onClick={handleReset} size="sm">
                    Reset
                </Button>
            </div>

            <div className="md:hidden relative w-full">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full appearance-none bg-background pl-8 shadow-none"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </div>
        </div>
    );
};