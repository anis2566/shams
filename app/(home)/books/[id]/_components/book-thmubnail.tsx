import Image from "next/image"

interface Props {
    imageUrl: string;
}

export const BookThumbnail = ({ imageUrl }: Props) => {
    return (
        <div className="flex flex-col gap-y-5">
            <div className="border rounded-md px-2 py-4 flex items-center justify-center max-h-[370px] max-w-[280px]">
                <Image
                    src={imageUrl}
                    alt="book-thumbnail"
                    width={200}
                    height={200}
                />
            </div>
        </div>
    )
}