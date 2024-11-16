import { PriceFilter } from "./price-filter";
import { Sort } from "./sort";
import { StockFilter } from "./stock-filter";
import { DiscountFilter } from "./discount-filter";

export const Filter = () => {
    return (
        <div className="space-y-4 pr-4">
            <Sort />
            <StockFilter />
            <PriceFilter />
            <DiscountFilter />

            {/* <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-x-2 justify-between">
                        Filter
                        <Button variant="destructive">
                            Reset
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="authors">
                            <AccordionTrigger className="hover:no-underline">Authors</AccordionTrigger>
                            <AccordionContent>
                                <AuthorList authors={authors} />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="publications">
                            <AccordionTrigger className="hover:no-underline">Publications</AccordionTrigger>
                            <AccordionContent>
                                <PublicationList publications={publications} />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="language">
                            <AccordionTrigger className="hover:no-underline">Language</AccordionTrigger>
                            <AccordionContent>
                                <LanguageList languages={languages} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card> */}
        </div>
    )
}
