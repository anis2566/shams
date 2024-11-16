import { Metadata } from "next";

import { CheckoutForm } from "./_components/checkout-form";

export const metadata: Metadata = {
    title: "BookGhor | Checkout",
    description: "Checkout.",
};


const Checkout = () => {
    return (
        <div className="px-3 md:px-0 mt-4 pb-6">
            <CheckoutForm />
        </div>
    )
}

export default Checkout
