"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function MenuCard({ item }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow">
      <div className="relative h-44 w-full">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-2 left-2 bg-brown/90 text-white text-xs px-2 py-0.5 rounded">
          {item.category}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading font-semibold text-base">{item.name}</h3>
          <span className="text-brown font-semibold text-sm whitespace-nowrap">
            ₹{item.price.toFixed(2)}
          </span>
        </div>
        <p className="mt-1 text-sm text-text-muted line-clamp-2">
          {item.description}
        </p>
        <button
          onClick={handleAdd}
          className={`mt-3 w-full py-2 rounded text-sm font-medium transition-colors ${
            added
              ? "bg-success text-white"
              : "bg-brown text-white hover:bg-brown-dark"
          }`}
        >
          {added ? "✓ Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
