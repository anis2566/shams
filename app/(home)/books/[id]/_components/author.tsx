import { Author as AuthorType } from "@prisma/client"
import Image from "next/image"

interface AuthorProps {
    author: AuthorType
}

export const Author = ({author}: AuthorProps) => {
    return <div className="grid md:grid-cols-5 mt-4">
        <div className="flex justify-center items-center">
            {author.imageUrl && <Image src={author.imageUrl} alt={author.name} width={150} height={150} className="rounded-full" />}
        </div>
        <div className="md:col-span-4 space-y-3">
            <h1 className="text-2xl font-bold">{author.name}</h1>
            <p className="text-sm text-muted-foreground">{author.bio}</p>
        </div>
    </div>
}