"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentMethod } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { LoadingButton } from "@/components/loading-button";
import { useCart } from "@/hooks/use-cart";
import { OrderSchema, OrderSchemaType } from "@/schema/order.schema";
import { useCreateOrderMutation } from "../mutation";

export const CheckoutForm = () => {
    const [districts, setDistricts] = useState<{ district: string }[]>([])

    const { cart } = useCart();
    const { mutate, isPending } = useCreateOrderMutation()

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const res = await fetch(`https://bdapis.com/api/v1.2/districts`)
                const parsedData = await res.json()
                if (Array.isArray(parsedData.data)) {
                    setDistricts(parsedData.data)
                } else {
                    console.error('Unexpected API response format:', parsedData)
                    setDistricts([])
                }
            } catch (error) {
                console.error('Error fetching districts:', error)
                setDistricts([])
            }
        }
        fetchDistricts()
    }, [])


    const form = useForm<OrderSchemaType>({
        resolver: zodResolver(OrderSchema),
        defaultValues: {
            name: "",
            phone: "",
            altPhone: "",
            country: "Bangladesh",
            city: "",
            thana: "",
            zone: "",
            address: "",
            shippingCharge: 100,
            paymentMethod: undefined,
            orderItems: cart.map((item) => ({
                bookId: item.book.id,
                quantity: item.quantity,
                price: item.price,
            })),
        }
    })

    const onSubmit = (data: OrderSchemaType) => {
        mutate(data)
    }

    const totalPrice = cart.reduce((acc, item) => acc + (item.quantity * item.price), 0);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Address</CardTitle>
                            <CardDescription>Please fill up the form to continue</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="altPhone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Alt Phone</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select country" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <Select
                                                onValueChange={value => {
                                                    field.onChange(value)
                                                    if (value === "Dhaka") {
                                                        form.setValue("shippingCharge", 60)
                                                    } else {
                                                        form.setValue("shippingCharge", 100)
                                                    }
                                                }}
                                                defaultValue={field.value}
                                                disabled={isPending}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select city" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {districts.sort((a, b) => a.district.localeCompare(b.district)).map((district) => (
                                                        <SelectItem key={district.district} value={district.district}>
                                                            {district.district}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="thana"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Thana</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="zone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Zone</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} rows={3} placeholder="বাসা/ফ্ল্যাট নম্বর, পাড়া-মহল্লার নাম, পরিচিতির এলাকা উল্লেখ করুন" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                            <CardDescription>Please select a payment method to continue</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="paymentMethod"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                                disabled={isPending}
                                            >
                                                <FormItem className="space-y-3">
                                                    <div>
                                                        <h1 className="text-sm font-semibold">ক্যাশ অন ডেলিভারি</h1>
                                                        <p className="text-sm text-muted-foreground">পণ্য হাতে পেয়ে টাকা পরিশোধ করুন</p>
                                                    </div>
                                                    <div className="flex items-center gap-x-3 border border-gray-200 rounded-md py-2 px-4 max-w-fit">
                                                        <FormControl>
                                                            <RadioGroupItem value={PaymentMethod.COD} />
                                                        </FormControl>
                                                        <FormLabel className="flex items-center gap-x-2">
                                                            <Image src="/cod.jpg" alt="cod" width={40} height={40} />
                                                            <p className="text-md text-muted-foreground">ক্যাশ অন ডেলিভারি</p>
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Checkout Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between border-b p-2">
                                <p>Subtotal</p>
                                <p>৳{totalPrice}</p>
                            </div>
                            <div className="flex justify-between border-b p-2">
                                <p>Shipping <span className="text-xs text-muted-foreground">(changeable)</span></p>
                                <p>৳{form.watch("shippingCharge")}</p>
                            </div>
                            <div className="flex justify-between p-2">
                                <p>Total</p>
                                <p>৳{ (totalPrice + form.watch("shippingCharge")).toFixed(2) }</p>
                            </div>
                            <div className="flex items-center gap-x-2 mt-4">
                                <Input type="text" placeholder="Enter your coupon code" disabled={isPending} />
                                <Button variant="secondary" disabled={isPending}>Apply</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <LoadingButton
                        isLoading={isPending}
                        title={`Confirm Order ৳${ (totalPrice + form.watch("shippingCharge")).toFixed(2) }`}
                        loadingTitle="Processing..."
                        onClick={() => { }}
                        type="submit"
                    />
                </div>
            </form>
        </Form>
    )
}
