import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Author, Book } from "@prisma/client";

interface BookWithAuthor extends Book {
  author: Author;
}

interface CartItem {
  book: BookWithAuthor;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  resetCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item: CartItem) => {
        const cart = get().cart;
        const existingItem = cart.find(
          (cartItem) => cartItem.book.id === item.book.id,
        );

        if (existingItem) {
          // Update quantity if item already exists in cart
          set({
            cart: cart.map((cartItem) =>
              cartItem.book.id === item.book.id
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem,
            ),
          });
        } else {
          // Add new item to cart
          set({ cart: [...cart, item] });
        }
      },

      removeFromCart: (bookId: string) => {
        set({
          cart: get().cart.filter((cartItem) => cartItem.book.id !== bookId),
        });
      },

      incrementQuantity: (bookId: string) => {
        set({
          cart: get().cart.map((cartItem) =>
            cartItem.book.id === bookId
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          ),
        });
      },

      decrementQuantity: (bookId: string) => {
        set({
          cart: get().cart.map((cartItem) =>
            cartItem.book.id === bookId && cartItem.quantity > 1
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem,
          ),
        });
      },
      resetCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "user-cart",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

interface OpenCartModalState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useOpenCartModal = create<OpenCartModalState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
