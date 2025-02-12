import { CornerDownLeft } from "lucide-react"
import Image from "next/image"

export const DeliveryBanner2 = () => {
    return (
        <div className="px-3 md:px-0 py-4 hidden md:grid md:grid-cols-3 gap-6">
            <div className="w-full border border-primary rounded-md p-3 py-4 flex items-center justify-center gap-x-3">
                <p className="text-base font-semibold text-muted-foreground">সমগ্র বাংলাদেশে হোম ডেলিভারি</p>
                <Image src="/cod.jpg" alt="delivery" width={24} height={24} />
            </div>
            <div className="w-full border border-primary rounded-md p-3 py-4 flex items-center justify-center gap-x-3">
                <p className="text-base font-semibold text-muted-foreground">সম্পূর্ণ ক্যাশ অন ডেলিভারি</p>
                <Image src="/cod.jpg" alt="delivery" width={24} height={24} />
            </div>
            <div className="w-full border border-primary rounded-md p-3 py-4 flex items-center justify-center gap-x-3">
                <p className="text-base font-semibold text-muted-foreground">7 Days Happy Return</p>
                <CornerDownLeft className="w-6 h-6 text-muted-foreground" />
            </div>
        </div>
    )
}