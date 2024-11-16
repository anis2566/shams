"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { BookStatus } from "@prisma/client";

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
import { FilterDrawer } from "./filter-drawer";



export const Header = () => {
    const [search, setSearch] = useState<string>("");
    const [seller, setSeller] = useState<string>("");
    const [perPage, setPerPage] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    const [status, setStatus] = useState<string | BookStatus>("");
    const [category, setCategory] = useState<string>("");
    const [publisher, setPublisher] = useState<string>("");
    const [author, setAuthor] = useState<string>("");

    const [open, setOpen] = useState<boolean>(false);

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchValue = useDebounce(search, 500);
    const categoryValue = useDebounce(category, 500);
    const publisherValue = useDebounce(publisher, 500);
    const authorValue = useDebounce(author, 500);
    const sellerValue = useDebounce(seller, 500);

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
                    name: searchValue,
                    category: categoryValue,
                    publisher: publisherValue,
                    author: authorValue,
                    seller: sellerValue,
                },
            },
            { skipEmptyString: true, skipNull: true },
        );

        router.push(url);
    }, [searchValue, categoryValue, publisherValue, authorValue, sellerValue, router, pathname]);

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

    const handleStatusChange = (status: BookStatus) => {
        setStatus(status);
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl(
            {
                url: pathname,
                query: {
                    ...params,
                    status,
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
        setStatus("");
        setCategory("");
        setPublisher("");
    };

    return (
        <div className="space-y-2 p-2 shadow-sm shadow-primary">
            <FilterDrawer open={open} handleClose={handleClose} />

            <div className="flex items-center gap-x-3 justify-between">
                <Button size="sm" variant="outline" onClick={() => setOpen(true)} className="md:hidden">
                    Filter
                </Button>
                <div className="hidden md:flex flex-1 items-center gap-x-3">
                    <div className="relative w-full max-w-[200px]">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="name..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                    </div>
                    <div className="relative w-full max-w-[200px]">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="category..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />
                    </div>
                    <div className="relative w-full max-w-[200px]">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="publisher..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                            onChange={(e) => setPublisher(e.target.value)}
                            value={publisher}
                        />
                    </div>
                    <div className="relative w-full max-w-[200px]">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="author..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                            onChange={(e) => setAuthor(e.target.value)}
                            value={author}
                        />
                    </div>
                    <div className="relative w-full max-w-[200px]">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="seller..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                            onChange={(e) => setSeller(e.target.value)}
                            value={seller}
                        />
                    </div>
                    <Select
                        value={status || ""}
                        onValueChange={(value) =>
                            handleStatusChange(value as BookStatus)
                        }
                    >
                        <SelectTrigger className="w-full max-w-[90px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(BookStatus).map((v, i) => (
                                <SelectItem value={v} key={i}>
                                    {v}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={sort}
                        onValueChange={(value) => handleSortChange(value)}
                    >
                        <SelectTrigger className="w-full max-w-[90px]">
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
                        <SelectTrigger className="w-full max-w-[90px]">
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
        </div>
    );
};
