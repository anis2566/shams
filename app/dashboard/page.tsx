import { Check, DollarSign, RefreshCcw, ShoppingCart } from 'lucide-react'

import { ContentLayout } from './_components/content-layout'
import { EarningCard } from './_components/earning-card'
import { OrderStat } from './_components/order-stat'
import { GET_DASHBOARD_DATA } from './action'
import { RecentOrders } from './_components/recent-orders'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Shams Publications | Dashboard",
    description: "Dashboard.",
};

const Dashboard = async () => {
    const { todayOrder, weekOrder, monthOrder, pendingOrder, returnedOrder, deliveredOrder, recentOrders } = await GET_DASHBOARD_DATA()

    return (
        <ContentLayout title='Dashboard'>
            <div className='space-y-6'>
                <div className='grid md:grid-cols-3 gap-4'>
                    <EarningCard title='Today' value={todayOrder} Icon={DollarSign} />
                    <EarningCard title='This Week' value={weekOrder} Icon={DollarSign} />
                    <EarningCard title='This Month' value={monthOrder} Icon={DollarSign} />
                </div>
                <div className='grid md:grid-cols-3 gap-4'>
                    <OrderStat title='Pending' value={pendingOrder} icon={ShoppingCart} className='bg-orange-500' />
                    <OrderStat title='Returned' value={returnedOrder} icon={RefreshCcw} className='bg-red-500' />
                    <OrderStat title='Delivered' value={deliveredOrder} icon={Check} className='bg-green-500' />
                </div>

                <RecentOrders orders={recentOrders} />
            </div>
        </ContentLayout>
    )
}

export default Dashboard
