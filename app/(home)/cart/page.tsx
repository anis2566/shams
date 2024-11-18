import { Metadata } from "next";

import { CartPage } from "./_components/cart-page"

export const metadata: Metadata = {
    title: "Shams Publication | Cart",
    description: "Cart page.",
};


const Cart = () => {
    return <CartPage />
}

export default Cart
