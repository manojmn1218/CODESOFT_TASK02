"use client";

import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import Link from "next/link";

export default function CartPage() {
  const { cart, subtotal, tax, total, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="font-heading text-2xl font-semibold text-text">
          Your cart is empty
        </h1>
        <p className="mt-2 text-text-muted">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link href="/menu" className="btn-primary inline-block mt-6">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-text">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-error hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Cart items */}
      <div className="mt-6 bg-white rounded-lg border border-border p-4 sm:p-6">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Order summary */}
      <div className="mt-6 bg-white rounded-lg border border-border p-4 sm:p-6">
        <h2 className="font-heading text-lg font-semibold mb-4">
          Order Summary
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">GST (5%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
        <Link
          href="/checkout"
          className="btn-primary block text-center mt-6 w-full"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
