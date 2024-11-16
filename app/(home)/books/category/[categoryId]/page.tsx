import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { db } from "@/lib/prisma"
import { Filter } from "./_components/filter"
import { BookCard } from "@/components/book-card"

interface Props {
    params: {
        categoryId: string
    }
}

const Category = async ({ params }: Props) => {
    const category = await db.category.findUnique({
        where: {
            id: params.categoryId
        },
        include: {
            subCategories: {
                include: {
                    books: true
                }
            }
        }
    })

    if (!category) return redirect("/books")

    const books = await db.book.findMany({
        where: {
            categoryId: category.id
        },
        include: {
            author: true
        },
        orderBy: {
            totalSold: "desc"
        },
        take: 12
    })

    return (
        <div className='mt-4 space-y-6 px-3 md:px-0'>
            <div className="grid md:grid-cols-4 gap-6">
                <div className="hidden md:flex flex-col md:col-span-1 flex-shrink-0 h-full">
                    <Filter categoryId={category.id} />
                </div>
                <div className="md:col-span-3 space-y-10">
                    <Image src={category.imageUrl ?? ""} alt={category.name} width={1000} height={1000} className="w-full h-full max-h-[200px] md:max-h-[300px] object-contain md:object-cover" />

                    <Card>
                        <CardHeader>
                            <CardTitle>Sub Categories</CardTitle>
                        </CardHeader>
                        <CardContent className="w-ful grid grid-cols-2 md:grid-cols-5 gap-4">
                            {
                                category.subCategories.map((subCategory) => (
                                    <Link key={subCategory.id} href={`/books?subcategory=${subCategory.id}`} className="flex flex-col items-center gap-1 border border-primary rounded-md py-3 px-5 w-full max-w-fit"   >
                                        <p className="text-center">{subCategory.name}</p>
                                        <span className="text-sm text-muted-foreground">{subCategory.books.length} books</span>
                                    </Link>
                                ))
                            }
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold text-gray-700">Best Selling</h1>
                        <div className="grid gap-x-2 md:gap-x-4 gap-y-4 grid-cols-2 md:grid-cols-4">
                            {
                                books.map((book) => (
                                    <BookCard key={book.id} book={book} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category
