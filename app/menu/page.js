"use client";

import { useState } from "react";
import menuItems, { categories } from "@/lib/menuData";
import MenuCard from "@/components/MenuCard";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-heading text-3xl font-bold text-text">Our Menu</h1>
      <p className="mt-2 text-text-muted">
        Everything&apos;s made fresh — pick what you&apos;re craving
      </p>

      {/* Category filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-brown text-white"
                : "bg-white text-text-muted border border-border hover:border-brown hover:text-brown"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted py-12">
          No items in this category yet.
        </p>
      )}
    </div>
  );
}
