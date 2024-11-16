import { Card, CardContent } from "@/components/ui/card"

const Points = () => {
    return (
        <div className="space-y-4">
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-sm text-muted-foreground">Available Points</p>
                            <p className="text-3xl font-bold">100</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Points
