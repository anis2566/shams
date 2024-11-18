import { Metadata } from "next";

import { WishlistPage } from "./_components/wishlist-page";

export const metadata: Metadata = {
    title: "Shams Publication | Wishlist",
    description: "Wishlist page.",
};

const Wishlist = () => {
    return <WishlistPage />
}

export default Wishlist