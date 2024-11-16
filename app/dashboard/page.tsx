import React from 'react'
import { ContentLayout } from './_components/content-layout'
import { StatCard } from './_components/stat-card'
import { Check, DollarSign, RefreshCcw, ShoppingCart } from 'lucide-react'
import { EarningCard } from './_components/earning-card'
import { OrderStat } from './_components/order-stat'
import { EarningChart } from './_components/chart/earning-chart'
import { RecentOrders } from './_components/recent-orders'
import { db } from '@/lib/prisma'
import { GET_DASHBOARD_DATA } from './action'

const Dashboard = async () => {
    const { todayOrder, weekOrder, monthOrder, pendingOrder, returnedOrder, deliveredOrder, recentOrders } = await GET_DASHBOARD_DATA()

    return (
        <ContentLayout title='Dashboard'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                <div className='md:col-span-3 space-y-6'>
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
                <div className='md:col-span-1'>
                </div>
            </div>
        </ContentLayout>
    )
}

export default Dashboard
