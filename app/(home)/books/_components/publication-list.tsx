"use client"

import { useState } from "react"
import { Publication } from "@prisma/client"
import { useSearchParams, useRouter } from "next/navigation"
import queryString from "query-string"

import { Input } from "@/components/ui/input"

interface PublicationListProps {
    publications: Publication[]
}

export const PublicationList = ({ publications }: PublicationListProps) => {
    const [search, setSearch] = useState<string>("")

    const searchParams = useSearchParams()
    const router = useRouter()

    let uniquePublications = publications.filter((publication, index, self) =>
        index === self.findIndex((t) => t.name === publication.name)
    )

    const filteredPublications = uniquePublications.filter((publication) =>
        publication.name.toLowerCase().includes(search.toLowerCase())
    )

    const handleClick = (publication: Publication) => {
        const params = Object.fromEntries(searchParams.entries())

        const url = queryString.stringifyUrl({
            url: "/books",
            query: {
                ...params,
                publication: publication.id
            }
        }, { skipEmptyString: true, skipNull: true })
        router.push(url)
    }

    return (
        <div className="space-y-2">
            <Input type="search" placeholder="Search author" value={search} onChange={(e) => setSearch(e.target.value)} />

            <div className="space-y-2">
                {filteredPublications.map((publication) => (
                    <div key={publication.id} className="hover:underline cursor-pointer p-2 rounded-md" onClick={() => handleClick(publication)}>
                        {publication.name}
                    </div>
                ))}
            </div>
        </div>
    )
}