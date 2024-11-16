import { Book, Author, Publication } from "@prisma/client"

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

interface BookWithRelations extends Book {
    author: Author
    publication: Publication
}

interface SpecificationProps {
    book: BookWithRelations
}

const Specification: React.FC<SpecificationProps> = ({ book }) => {
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>{book.name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Author</TableCell>
                    <TableCell>{book.author.name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Publisher</TableCell>
                    <TableCell>{book.publication.name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>ISBN</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Edition</TableCell>
                    <TableCell>{book.edition} Edition</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Pages</TableCell>
                    <TableCell>{book.length} Pages</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Language</TableCell>
                    <TableCell>Bangla</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default Specification