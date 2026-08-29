import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { store } from "@/lib/fallbackStore";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, type, address, note, items } = body;

    // Validate required fields
    if (!name || !email || !phone || !type || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (type === "delivery" && !address) {
      return NextResponse.json(
        { error: "Address is required for delivery" },
        { status: 400 }
      );
    }

    // Calculate total in INR with 5% GST
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    // Attempt PostgreSQL via Prisma
    try {
      if (process.env.DATABASE_URL) {
        const order = await prisma.order.create({
          data: {
            customerName: name,
            email,
            phone,
            type,
            address: address || null,
            note: note || null,
            total,
            items: {
              create: items.map((item) => ({
                menuItemId: item.menuItemId,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              })),
            },
          },
          include: { items: true },
        });
        return NextResponse.json(order, { status: 201 });
      }
    } catch (dbErr) {
      console.warn("Prisma unavailable, saving order to fallback store:", dbErr.message);
    }

    // Fallback store
    const newOrder = {
      id: store.orders.length > 0 ? Math.max(...store.orders.map(o => o.id)) + 1 : 101,
      customerName: name,
      email,
      phone,
      type,
      address: address || null,
      note: note || null,
      status: "received",
      total,
      createdAt: new Date().toISOString(),
      items: items.map((item, idx) => ({
        id: idx + 1,
        menuItemId: item.menuItemId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        menuItem: { name: item.name },
      })),
    };
    store.orders.unshift(newOrder);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      try {
        const orders = await prisma.order.findMany({
          include: {
            items: {
              include: { menuItem: true },
            },
          },
          orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(orders);
      } catch (dbErr) {
        console.warn("Prisma error in GET orders, using fallback:", dbErr.message);
      }
    }
    return NextResponse.json(store.orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(store.orders);
  }
}
