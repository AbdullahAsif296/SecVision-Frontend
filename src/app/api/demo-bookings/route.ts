import { NextResponse } from "next/server";
import { storage } from "@/services/storage";

export async function GET() {
  try {
    const bookings = await storage.getAllDemoBookings();
    return NextResponse.json(bookings);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}


