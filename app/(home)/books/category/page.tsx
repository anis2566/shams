import Link from 'next/link'
import React from 'react'

import { db } from '@/lib/prisma'
import { PopularCategory } from './_components/popular-category'
import { CustomPagination } from '@/components/custom-pagination'
import { Header } from './_components/header'

interface Props {
    searchParams: {
        page?: string;
        search?: string;
        perPage?: string;
        sort?: string;
    }
}

const Category = async ({ searchParams }: Props) => {
    const { page, search, perPage, sort } = searchParams
    const pageNumber = parseInt(page || "1")
    const perPageNumber = parseInt(perPage || "12")

    const popularCategories = await db.category.findMany({
        orderBy: {
            books: {
                _count: "desc"
            }
        },
        take: 10
    })

    const [categories, totalCategories] = await Promise.all([
        db.category.findMany({
            where: {
                ...(search && {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                })
            },
            include: {
                books: {
                    select: {
                        id: true
                    }
                }
            },
            skip: (pageNumber - 1) * perPageNumber,
            take: perPageNumber,
            orderBy: {
                ...(sort && {
                    createdAt: sort === "asc" ? "asc" : "desc"
                }),
            }
        }),
        db.category.count({
            where: {
                ...(search && {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                })
            }
        })
    ])

    const totalPages = Math.ceil(totalCategories / perPageNumber)

    return (
        <div className='px-3 md:px-0 mt-28 md:mt-4 space-y-10'>
            <PopularCategory categories={popularCategories} />

            <div className='space-y-3'>
                <h2 className='text-xl font-bold text-gray-600'>All Category</h2>
                <Header />
                <div className='grid grid-cols-2 md:grid-cols-6 gap-3'>
                    {
                        categories.map((category) => (
                            <Link key={category.id} href={`/books?category=${category.id}`} className='relative h-40 rounded-lg overflow-hidden border max-h-[100px] hover:bg-primary group'>
                                <div style={{ backgroundImage: `url(/book-stack.png)`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }} className='bg-contain bg-center h-full w-full absolute opacity-10'></div>
                                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                                    <h3 className='text-lg text-primary font-bold group-hover:text-white transition-all duration-300 text-center'>{category.name}</h3>
                                    <p className='text-sm text-gray-500 group-hover:text-white transition-all duration-300'>{category.books.length} Books</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <CustomPagination totalPages={totalPages} />
            </div>
        </div>
    )
}

export default Category
