"use client"

import { useState } from "react"
import { Language } from "@prisma/client"
import { useSearchParams, useRouter } from "next/navigation"
import queryString from "query-string"

import { Input } from "@/components/ui/input"

interface LanguageListProps {
    languages: Language[]
}

export const LanguageList = ({ languages }: LanguageListProps) => {
    const [search, setSearch] = useState<string>("")

    const searchParams = useSearchParams()
    const router = useRouter()

    let uniqueLanguages = Array.isArray(languages) ? languages.filter((language, index, self) =>
        index === self.findIndex((t) => t === language)
    ) : []

    console.log(uniqueLanguages)

    const filteredLanguages = uniqueLanguages.filter((language) =>
        language.toLowerCase().includes(search.toLowerCase())
    )

    const handleClick = (language: Language) => {
        const params = Object.fromEntries(searchParams.entries())

        const url = queryString.stringifyUrl({
            url: "/books",
            query: {
                ...params,
                language: language
            }
        }, { skipEmptyString: true, skipNull: true })
        router.push(url)
    }

    return (
        <div className="space-y-2">
            <Input type="search" placeholder="Search author" value={search} onChange={(e) => setSearch(e.target.value)} />

            <div className="space-y-2">
                {filteredLanguages.map((language) => (
                    <div key={language} className="hover:underline cursor-pointer p-2 rounded-md" onClick={() => handleClick(language)}>
                        {language}
                    </div>
                ))}
            </div>
        </div>
    )
}