import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { store } from "@/lib/fallbackStore";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    let authenticated = false;
    let staffUsername = username;

    // Try Prisma
    try {
      if (process.env.DATABASE_URL) {
        const staff = await prisma.staff.findUnique({
          where: { username },
        });

        if (staff) {
          const passwordMatch = await bcrypt.compare(password, staff.password);
          if (passwordMatch) {
            authenticated = true;
            staffUsername = staff.username;
          }
        }
      }
    } catch (dbErr) {
      console.warn("Prisma unavailable in login, using fallback store:", dbErr.message);
    }

    // Fallback store check
    if (!authenticated) {
      const fallbackStaff = store.staff.find((s) => s.username === username);
      if (fallbackStaff) {
        const match = await bcrypt.compare(password, fallbackStaff.passwordHash);
        if (match) {
          authenticated = true;
          staffUsername = fallbackStaff.username;
        }
      }
    }

    if (!authenticated) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Set a session cookie
    const response = NextResponse.json({
      message: "Login successful",
      username: staffUsername,
    });

    response.cookies.set("staff-session", staffUsername, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed: " + error.message },
      { status: 500 }
    );
  }
}
