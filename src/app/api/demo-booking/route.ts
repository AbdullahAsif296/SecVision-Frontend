import { NextRequest, NextResponse } from "next/server";
import { insertDemoBookingSchema } from "@shared/schema";
import { storage } from "@/services/storage";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const data = insertDemoBookingSchema.parse(json);
    const booking = await storage.createDemoBooking(data);
    return NextResponse.json({ success: true, booking });
  } catch (err) {
    return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
  }
}


