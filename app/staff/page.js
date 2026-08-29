"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StaffDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [ordersRes, reservationsRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/reservations"),
      ]);

      if (ordersRes.status === 401 || reservationsRes.status === 401) {
        router.push("/staff/login");
        return;
      }

      const ordersData = await ordersRes.json();
      const reservationsData = await reservationsRes.json();

      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setReservations(Array.isArray(reservationsData) ? reservationsData : []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(orderId, newStatus) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/staff/login");
  }

  // Filter today's orders
  const today = new Date().toDateString();
  const todaysOrders = orders.filter(
    (o) => new Date(o.createdAt).toDateString() === today
  );
  const pendingOrders = orders.filter(
    (o) => o.status === "received" || o.status === "preparing"
  );
  const todaysReservations = reservations.filter(
    (r) => new Date(r.date).toDateString() === today
  );

  const statusColors = {
    received: "bg-orange/10 text-orange",
    preparing: "bg-blue-100 text-blue-700",
    ready: "bg-green-100 text-green-700",
    completed: "bg-gray-100 text-gray-500",
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-text-muted">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text">
            Staff Dashboard
          </h1>
          <p className="text-text-muted text-sm mt-0.5">
            Manage orders and reservations
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-text-muted hover:text-error transition-colors"
        >
          Log Out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-border p-4">
          <p className="text-2xl font-bold text-text">{todaysOrders.length}</p>
          <p className="text-sm text-text-muted">Today&apos;s Orders</p>
        </div>
        <div className="bg-white rounded-lg border border-border p-4">
          <p className="text-2xl font-bold text-orange">{pendingOrders.length}</p>
          <p className="text-sm text-text-muted">Pending</p>
        </div>
        <div className="bg-white rounded-lg border border-border p-4">
          <p className="text-2xl font-bold text-text">{todaysReservations.length}</p>
          <p className="text-sm text-text-muted">Today&apos;s Reservations</p>
        </div>
        <div className="bg-white rounded-lg border border-border p-4">
          <p className="text-2xl font-bold text-text">{orders.length}</p>
          <p className="text-sm text-text-muted">Total Orders</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "orders"
              ? "border-brown text-brown"
              : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          All Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "pending"
              ? "border-brown text-brown"
              : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          Pending ({pendingOrders.length})
        </button>
        <button
          onClick={() => setActiveTab("reservations")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "reservations"
              ? "border-brown text-brown"
              : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          Reservations ({reservations.length})
        </button>
      </div>

      {/* Orders tab */}
      {(activeTab === "orders" || activeTab === "pending") && (
        <div className="space-y-3">
          {(activeTab === "pending" ? pendingOrders : orders).length === 0 ? (
            <p className="text-text-muted text-center py-8">No orders yet</p>
          ) : (
            (activeTab === "pending" ? pendingOrders : orders).map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg border border-border p-4 sm:p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-heading font-semibold">
                        Order #{order.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          statusColors[order.status] || ""
                        }`}
                      >
                        {order.status?.charAt(0).toUpperCase() +
                          order.status?.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted mt-0.5">
                      {order.customerName} · {order.type} ·{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Status update dropdown */}
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                    className="px-3 py-1.5 rounded border border-border text-sm focus:outline-none focus:border-brown w-full sm:w-auto"
                  >
                    <option value="received">Received</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Order items */}
                <div className="text-sm text-text-muted space-y-1">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <span>
                        {item.menuItem?.name || item.name} × {item.quantity}
                      </span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-border flex justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span>₹{order.total?.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Reservations tab */}
      {activeTab === "reservations" && (
        <div className="bg-white rounded-lg border border-border overflow-x-auto">
          {reservations.length === 0 ? (
            <p className="text-text-muted text-center py-8">
              No reservations yet
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium text-text-muted">
                    Name
                  </th>
                  <th className="text-left p-3 font-medium text-text-muted">
                    Phone
                  </th>
                  <th className="text-left p-3 font-medium text-text-muted">
                    Date
                  </th>
                  <th className="text-left p-3 font-medium text-text-muted">
                    Time
                  </th>
                  <th className="text-left p-3 font-medium text-text-muted">
                    Guests
                  </th>
                  <th className="text-left p-3 font-medium text-text-muted">
                    Request
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr key={res.id} className="border-b border-border last:border-b-0">
                    <td className="p-3 font-medium">{res.customerName}</td>
                    <td className="p-3 text-text-muted">{res.phone}</td>
                    <td className="p-3 text-text-muted">
                      {new Date(res.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-text-muted">{res.time}</td>
                    <td className="p-3 text-text-muted">{res.guests}</td>
                    <td className="p-3 text-text-muted">
                      {res.specialRequest || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
