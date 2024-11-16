"use client"

import { useState } from "react"
import { Author } from "@prisma/client"
import { useSearchParams, useRouter } from "next/navigation"
import queryString from "query-string"

import { Input } from "@/components/ui/input"

interface AuthorListProps {
    authors: Author[]
}

export const AuthorList = ({ authors }: AuthorListProps) => {
    const [search, setSearch] = useState<string>("")

    const searchParams = useSearchParams()
    const router = useRouter()

    let uniqueAuthors = authors.filter((author, index, self) =>
        index === self.findIndex((t) => t.name === author.name)
    )

    const filteredAuthors = uniqueAuthors.filter((author) =>
        author.name.toLowerCase().includes(search.toLowerCase())
    )

    const handleClick = (author: Author) => {
        const params = Object.fromEntries(searchParams.entries())

        const url = queryString.stringifyUrl({
            url: "/books",
            query: {
                ...params,
                author: author.id
            }
        }, { skipEmptyString: true, skipNull: true })
        router.push(url)
    }

    return (
        <div className="space-y-2">
            <Input type="search" placeholder="Search author" value={search} onChange={(e) => setSearch(e.target.value)} />

            <div className="space-y-2">
                {filteredAuthors.map((author) => (
                    <div key={author.id} className="hover:underline cursor-pointer p-2 rounded-md" onClick={() => handleClick(author)}>
                        {author.name}
                    </div>
                ))}
            </div>
        </div>
    )
}