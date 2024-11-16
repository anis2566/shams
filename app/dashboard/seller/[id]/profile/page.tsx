import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react'

const SellerProfile = async ({ params }: { params: { id: string } }) => {
    const seller = await db.seller.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!seller) return redirect("/dashboard/seller");

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='space-y-4'>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-sm font-medium'>Name</p>
                        <p className='text-sm text-muted-foreground'>{seller.name}</p>
                    </div>

                    <div className='flex items-center gap-x-2'>
                        <p className='text-sm font-medium'>Email</p>
                        <p className='text-sm text-muted-foreground'>{seller.email}</p>
                    </div>

                    <div className='flex items-center gap-x-2'>
                        <p className='text-sm font-medium'>Phone</p>
                        <p className='text-sm text-muted-foreground'>{seller.phone}</p>
                    </div>

                    <div className='flex items-center gap-x-2'>
                        <p className='text-sm font-medium'>Bio</p>
                        <p className='text-sm text-muted-foreground'>{seller.bio}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SellerProfile
