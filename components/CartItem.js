"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border last:border-b-0">
      {/* Image */}
      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">{item.name}</h3>
        <p className="text-text-muted text-sm">₹{item.price.toFixed(2)}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-7 h-7 flex items-center justify-center rounded border border-border text-sm hover:bg-cream-dark transition-colors"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="text-sm font-medium w-6 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-7 h-7 flex items-center justify-center rounded border border-border text-sm hover:bg-cream-dark transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Line total & remove */}
      <div className="text-right flex-shrink-0 w-20">
        <p className="font-medium text-sm">
          ₹{(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-xs text-error hover:underline mt-0.5"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
