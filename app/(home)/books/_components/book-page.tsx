"use client";

import { FilterIcon, Loader2, SortAscIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { BookCard, BookCardSkeleton } from "@/components/book-card";
import InfiniteScrollContainer from "@/components/infinite-scroll-container";
import { useGetBooks } from "../query";
import { Filter } from "./filter";
import { Language } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { FilterDrawer } from "./filter-drawer";
import { SortDrawer } from "./sort-drawer";

export const BookPage = () => {
    const searchParams = useSearchParams();
    const author = searchParams.get("author") || null;
    const category = searchParams.get("category") || null;
    const subcategory = searchParams.get("subcategory") || null;
    const publication = searchParams.get("publication") || null;
    const discount = searchParams.get("discount") === "true" || false;
    const query = searchParams.get("query") || null;
    const sort = searchParams.get("sort") || null;
    const minPrice = searchParams.get("minPrice") || null;
    const maxPrice = searchParams.get("maxPrice") || null;
    const minDiscount = searchParams.get("minDiscount") || null;
    const maxDiscount = searchParams.get("maxDiscount") || null;
    const language = searchParams.get("language") || null
    const inStock = searchParams.get("inStock") || null

    const { books, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status, total } = useGetBooks({ author, category, subcategory, publication, discount, query, sort, minPrice, maxPrice, language: language as Language | null, inStock, minDiscount, maxDiscount });

    return (
        <div className="px-0 mt-4 relative">
            <div className="flex gap-x-3 ">
                <div className="hidden md:flex flex-col w-72 flex-shrink-0 border-r border-gray-200 absolute top-0 left-0 h-full">
                    <Filter />
                </div>
                <div className="md:ml-72 md:pl-4 space-y-4 w-full">
                    <div className="text-md text-gray-500">{total} books found</div>
                    {status === "success" && !books.length && !hasNextPage ? (
                        <div className="flex justify-center items-center h-[50vh] w-full">
                            <p className="text-gray-500">No book found</p>
                        </div>
                    ) : null}
                    {status === "pending" ? (
                        <div className="grid gap-4 md:grid-cols-4">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i}>
                                    <BookCardSkeleton />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <InfiniteScrollContainer
                            className="grid gap-x-2 md:gap-x-4 gap-y-4 grid-cols-2 md:grid-cols-4"
                            onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
                        >
                            {books.map((book, i) => (
                                <BookCard key={i} book={book} />
                            ))}
                            {isFetchingNextPage && (
                                <div className="flex justify-center">
                                    <Loader2 className="mx-auto my-3 animate-spin" />
                                </div>
                            )}
                        </InfiniteScrollContainer>
                    )}
                </div>
            </div>
            <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-background border-t border-gray-200">
                <div className="flex items-center justify-between h-full px-4">
                    <FilterDrawer>
                        <Button variant="outline" className="flex items-center gap-x-2">
                            <FilterIcon className="w-4 h-4" />
                            Filter
                        </Button>
                    </FilterDrawer>

                    <div className="flex items-center gap-x-2">
                        <p className="text-sm text-gray-500">Sort By</p>
                        <SortDrawer>
                            <Button variant="outline" className="flex items-center gap-x-2">
                                <SortAscIcon className="w-4 h-4" />
                                Sort
                            </Button>
                        </SortDrawer>
                    </div>
                </div>
            </div>
        </div >
    )
}
