import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    description: string;
    // trend: "up" | "down" | "neutral";
    Icon: LucideIcon;
}

export const StatCard = ({ title, value, description, Icon }: StatCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
                {/* {trend === "up" && <ArrowUpIcon className="h-4 w-4 text-green-500" />}
                {trend === "down" && <ArrowDownIcon className="h-4 w-4 text-red-500" />}
                {trend === "neutral" && <ArrowRightIcon className="h-4 w-4 text-yellow-500" />} */}
            </CardContent>
        </Card>
    )
}
