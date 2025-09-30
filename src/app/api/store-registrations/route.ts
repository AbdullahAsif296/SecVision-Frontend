import { NextResponse } from "next/server";
import { storage } from "@/services/storage";

export async function GET() {
  try {
    const regs = await storage.getAllStoreRegistrations();
    return NextResponse.json(regs);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}


