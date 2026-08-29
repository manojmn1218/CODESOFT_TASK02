"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, subtotal, tax, total, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "pickup",
    address: "",
    note: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (form.type === "delivery" && !form.address.trim())
      errs.address = "Address is required for delivery";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: cart.map((item) => ({
            menuItemId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setOrderResult(data);
      clearCart();
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  // Redirect to cart if empty and no order placed
  if (cart.length === 0 && !orderResult) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="font-heading text-2xl font-semibold">Nothing to checkout</h1>
        <p className="mt-2 text-text-muted">Add some items to your cart first.</p>
        <button
          onClick={() => router.push("/menu")}
          className="btn-primary mt-6"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  // Order success screen
  if (orderResult) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="font-heading text-2xl font-bold text-success">
          Order Placed Successfully!
        </h1>
        <div className="mt-6 bg-white rounded-lg border border-border p-6 text-left">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Order ID</span>
              <span className="font-semibold">#{orderResult.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Total</span>
              <span className="font-semibold">
                ₹{orderResult.total?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Estimated Time</span>
              <span className="font-semibold">25-35 minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Status</span>
              <span className="bg-orange/10 text-orange px-2 py-0.5 rounded text-xs font-medium">
                Order Received
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push(`/orders?id=${orderResult.id}`)}
            className="btn-primary"
          >
            Track Order
          </button>
          <button
            onClick={() => router.push("/menu")}
            className="btn-secondary"
          >
            Order More
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-heading text-3xl font-bold text-text">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form fields */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white rounded-lg border border-border p-5">
            <h2 className="font-heading text-lg font-semibold mb-4">
              Your Details
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded border text-sm ${
                    errors.name ? "border-error" : "border-border"
                  } focus:outline-none focus:border-brown`}
                />
                {errors.name && (
                  <p className="text-error text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded border text-sm ${
                      errors.email ? "border-error" : "border-border"
                    } focus:outline-none focus:border-brown`}
                  />
                  {errors.email && (
                    <p className="text-error text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="e.g. +91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded border text-sm ${
                      errors.phone ? "border-error" : "border-border"
                    } focus:outline-none focus:border-brown`}
                  />
                  {errors.phone && (
                    <p className="text-error text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Delivery/Pickup */}
          <div className="bg-white rounded-lg border border-border p-5">
            <h2 className="font-heading text-lg font-semibold mb-4">
              Order Type
            </h2>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, type: "pickup" })}
                className={`flex-1 py-2.5 rounded border text-sm font-medium transition-colors ${
                  form.type === "pickup"
                    ? "bg-brown text-white border-brown"
                    : "border-border text-text-muted hover:border-brown"
                }`}
              >
                🏪 Pickup
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, type: "delivery" })}
                className={`flex-1 py-2.5 rounded border text-sm font-medium transition-colors ${
                  form.type === "delivery"
                    ? "bg-brown text-white border-brown"
                    : "border-border text-text-muted hover:border-brown"
                }`}
              >
                🚗 Delivery
              </button>
            </div>

            {form.type === "delivery" && (
              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                  Delivery Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={2}
                  value={form.address}
                  onChange={handleChange}
                  placeholder="e.g. #45, 2nd Cross, 5th Main, Indiranagar, Bengaluru - 560038"
                  className={`w-full px-3 py-2 rounded border text-sm ${
                    errors.address ? "border-error" : "border-border"
                  } focus:outline-none focus:border-brown resize-none`}
                />
                {errors.address && (
                  <p className="text-error text-xs mt-1">{errors.address}</p>
                )}
              </div>
            )}

            <div className="mt-4">
              <label htmlFor="note" className="block text-sm font-medium mb-1">
                Order Note <span className="text-text-muted">(optional)</span>
              </label>
              <textarea
                id="note"
                name="note"
                rows={2}
                value={form.note}
                onChange={handleChange}
                placeholder="Any special requests?"
                className="w-full px-3 py-2 rounded border border-border text-sm focus:outline-none focus:border-brown resize-none"
              />
            </div>
          </div>

          {/* Simulated payment */}
          <div className="bg-white rounded-lg border border-border p-5">
            <h2 className="font-heading text-lg font-semibold mb-3">
              Payment
            </h2>
            <div className="bg-cream rounded p-4 text-sm text-text-muted">
              <p className="font-medium text-text mb-1">💳 Pay on pickup/delivery</p>
              <p>
                Payment will be collected when your order is ready. We accept
                cash and cards.
              </p>
            </div>
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-border p-5 sticky top-24">
            <h2 className="font-heading text-lg font-semibold mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-text-muted">
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 space-y-1">
                <div className="flex justify-between text-text-muted">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>GST (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {errors.submit && (
              <p className="text-error text-sm mt-3">{errors.submit}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full mt-5 disabled:opacity-50"
            >
              {submitting ? "Placing Order..." : `Place Order — ₹${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
