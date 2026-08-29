"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const statusSteps = ["received", "preparing", "ready", "completed"];
const statusLabels = {
  received: "Order Received",
  preparing: "Preparing",
  ready: "Ready",
  completed: "Completed",
};

function OrderTracker() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("id") || "");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-fetch if ID is in URL
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setOrderId(id);
      fetchOrder(id);
    }
  }, [searchParams]);

  async function fetchOrder(id) {
    const cleanId = (id || orderId).toString().replace("#", "").trim();
    if (!cleanId) {
      setError("Please enter an order ID");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${cleanId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order not found");
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchOrder(orderId);
  }

  const currentStep = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-heading text-3xl font-bold text-text">
        Track Your Order
      </h1>
      <p className="mt-2 text-text-muted">
        Enter your order ID to see the current status
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID (e.g. 1)"
          className="flex-1 px-3 py-2 rounded border border-border text-sm focus:outline-none focus:border-brown"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? "Searching..." : "Track"}
        </button>
      </form>

      {error && (
        <div className="mt-4 bg-error/10 text-error px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      {order && (
        <div className="mt-8">
          {/* Status progress */}
          <div className="bg-white rounded-lg border border-border p-5 mb-6">
            <h2 className="font-heading text-lg font-semibold mb-6">
              Order Status
            </h2>
            <div className="flex items-center justify-between relative">
              {/* Progress line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-border z-0" />
              <div
                className="absolute top-4 left-0 h-0.5 bg-success z-0 transition-all duration-500"
                style={{
                  width: `${(currentStep / (statusSteps.length - 1)) * 100}%`,
                }}
              />

              {statusSteps.map((step, i) => (
                <div
                  key={step}
                  className="flex flex-col items-center relative z-10"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      i <= currentStep
                        ? "bg-success text-white"
                        : "bg-white border-2 border-border text-text-muted"
                    }`}
                  >
                    {i <= currentStep ? "✓" : i + 1}
                  </div>
                  <span className="text-xs mt-2 text-text-muted text-center max-w-[80px]">
                    {statusLabels[step]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Order details */}
          <div className="bg-white rounded-lg border border-border p-5">
            <h2 className="font-heading text-lg font-semibold mb-4">
              Order Details
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Order ID</span>
                <span className="font-medium">#{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Customer</span>
                <span className="font-medium">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Type</span>
                <span className="font-medium capitalize">{order.type}</span>
              </div>

              <div className="border-t border-border pt-3">
                <p className="font-medium mb-2">Items</p>
                {order.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-text-muted py-1"
                  >
                    <span>
                      {item.menuItem?.name || item.name} × {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{order.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Wrap in Suspense because of useSearchParams
export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-10">Loading...</div>}>
      <OrderTracker />
    </Suspense>
  );
}
