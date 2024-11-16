import { Sort } from "./sort-filter"
import { StockFilter } from "./stock-filter"
import { PriceFilter } from "./price-filter"
import { DiscountFilter } from "./discount-filter"

interface Props {
    categoryId: string
}

export const Filter = ({ categoryId }: Props) => {
    return (
        <div className="space-y-4">
            <Sort categoryId={categoryId} />
            <StockFilter categoryId={categoryId} />
            <PriceFilter categoryId={categoryId} />
            <DiscountFilter categoryId={categoryId} />
        </div>
    )
} 