import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { store } from "@/lib/fallbackStore";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const orderId = parseInt(id, 10);

    if (isNaN(orderId)) {
      return NextResponse.json({ error: "Invalid Order ID" }, { status: 400 });
    }

    // Try Prisma
    try {
      if (process.env.DATABASE_URL) {
        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: {
            items: {
              include: { menuItem: true },
            },
          },
        });
        if (order) return NextResponse.json(order);
      }
    } catch (dbErr) {
      console.warn("Prisma error in GET order [id], searching fallback store:", dbErr.message);
    }

    // Fallback store
    const fallbackOrder = store.orders.find((o) => o.id === orderId);
    if (!fallbackOrder) {
      return NextResponse.json({ error: "Order not found. Please verify your Order ID." }, { status: 404 });
    }

    return NextResponse.json(fallbackOrder);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order: " + error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const orderId = parseInt(id, 10);
    const body = await request.json();
    const { status } = body;

    const validStatuses = ["received", "preparing", "ready", "completed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be one of: " + validStatuses.join(", ") },
        { status: 400 }
      );
    }

    // Try Prisma
    try {
      if (process.env.DATABASE_URL) {
        const order = await prisma.order.update({
          where: { id: orderId },
          data: { status },
          include: { items: true },
        });
        return NextResponse.json(order);
      }
    } catch (dbErr) {
      console.warn("Prisma error in PATCH order [id], updating fallback store:", dbErr.message);
    }

    // Fallback store
    const orderIndex = store.orders.findIndex((o) => o.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    store.orders[orderIndex].status = status;
    return NextResponse.json(store.orders[orderIndex]);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order: " + error.message },
      { status: 500 }
    );
  }
}
