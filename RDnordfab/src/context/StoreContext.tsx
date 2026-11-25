"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";

type CartEntry = { product: Product; quantity: number };
type StoreContextType = {
  cart: CartEntry[];
  wishlist: number[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
};

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("rdnordfab-cart");
      const savedWishlist = localStorage.getItem("rdnordfab-wishlist");
      if (savedCart) setCart(JSON.parse(savedCart) as CartEntry[]);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist) as number[]);
    } catch {
      localStorage.removeItem("rdnordfab-cart");
      localStorage.removeItem("rdnordfab-wishlist");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("rdnordfab-cart", JSON.stringify(cart));
  }, [cart, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem("rdnordfab-wishlist", JSON.stringify(wishlist));
  }, [wishlist, ready]);

  const value = useMemo<StoreContextType>(() => ({
    cart,
    wishlist,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    addToCart: (product, quantity = 1) => setCart((current) => {
      const existing = current.find((entry) => entry.product.id === product.id);
      if (existing) return current.map((entry) => entry.product.id === product.id ? { ...entry, quantity: entry.quantity + quantity } : entry);
      return [...current, { product, quantity }];
    }),
    updateQuantity: (productId, quantity) => setCart((current) => quantity <= 0 ? current.filter((entry) => entry.product.id !== productId) : current.map((entry) => entry.product.id === productId ? { ...entry, quantity } : entry)),
    removeFromCart: (productId) => setCart((current) => current.filter((entry) => entry.product.id !== productId)),
    clearCart: () => setCart([]),
    toggleWishlist: (productId) => setWishlist((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]),
    isWishlisted: (productId) => wishlist.includes(productId)
  }), [cart, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
