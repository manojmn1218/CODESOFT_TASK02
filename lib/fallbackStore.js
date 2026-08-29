// In-memory / file-based fallback store when PostgreSQL is not yet connected
import menuItems from "./menuData";
import bcrypt from "bcryptjs";

// Global singleton in development so memory state persists across hot reloads
const globalStore = globalThis;

if (!globalStore.__dinedesk_store) {
  globalStore.__dinedesk_store = {
    reservations: [
      {
        id: 1,
        customerName: "Rahul Sharma",
        phone: "9876543210",
        date: new Date().toISOString(),
        time: "7:30 PM",
        guests: 4,
        specialRequest: "Window table please",
        status: "confirmed",
        createdAt: new Date().toISOString(),
      },
    ],
    orders: [
      {
        id: 101,
        customerName: "Priya Patel",
        email: "priya@example.com",
        phone: "9876501234",
        type: "pickup",
        address: null,
        note: "Less spicy please",
        status: "preparing",
        total: 504,
        createdAt: new Date().toISOString(),
        items: [
          {
            id: 1,
            menuItemId: 5,
            name: "Butter Chicken",
            quantity: 1,
            price: 360,
            menuItem: { name: "Butter Chicken" },
          },
          {
            id: 2,
            menuItemId: 16,
            name: "Mango Lassi",
            quantity: 1,
            price: 120,
            menuItem: { name: "Mango Lassi" },
          },
        ],
      },
    ],
    staff: [
      {
        id: 1,
        username: "admin",
        passwordHash: bcrypt.hashSync("dinedesk2024", 10),
      },
    ],
  };
}

export const store = globalStore.__dinedesk_store;
