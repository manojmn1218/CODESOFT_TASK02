import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { store } from "@/lib/fallbackStore";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, date, time, guests, specialRequest } = body;

    // Validate required fields
    if (!name || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: "Missing required fields. Please fill in all required inputs." },
        { status: 400 }
      );
    }

    const guestCount = parseInt(guests, 10);
    // Validate guests
    if (isNaN(guestCount) || guestCount < 1 || guestCount > 20) {
      return NextResponse.json(
        { error: "Number of guests must be between 1 and 20" },
        { status: 400 }
      );
    }

    // Validate date is not before today (compare YYYY-MM-DD strings to avoid timezone errors)
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    if (date < todayStr) {
      return NextResponse.json(
        { error: "Cannot make a reservation in the past" },
        { status: 400 }
      );
    }

    const reservationDate = new Date(date + "T12:00:00Z");

    // Attempt to save to PostgreSQL via Prisma
    try {
      if (process.env.DATABASE_URL) {
        const reservation = await prisma.reservation.create({
          data: {
            customerName: name.trim(),
            phone: phone.trim(),
            date: reservationDate,
            time,
            guests: guestCount,
            specialRequest: specialRequest ? specialRequest.trim() : null,
          },
        });
        return NextResponse.json(reservation, { status: 201 });
      }
    } catch (dbError) {
      console.warn("Prisma unavailable, saving to fallback store:", dbError.message);
    }

    // Fallback store
    const newReservation = {
      id: store.reservations.length + 1,
      customerName: name.trim(),
      phone: phone.trim(),
      date: reservationDate.toISOString(),
      time,
      guests: guestCount,
      specialRequest: specialRequest ? specialRequest.trim() : null,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    store.reservations.push(newReservation);

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Failed to create reservation: " + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      try {
        const reservations = await prisma.reservation.findMany({
          orderBy: { date: "asc" },
        });
        return NextResponse.json(reservations);
      } catch (dbErr) {
        console.warn("Prisma error in GET reservations, using fallback:", dbErr.message);
      }
    }
    return NextResponse.json(store.reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(store.reservations);
  }
}
