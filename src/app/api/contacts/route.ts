import { NextResponse } from "next/server";
import { storage } from "@/services/storage";

export async function GET() {
  try {
    const contacts = await storage.getAllContacts();
    return NextResponse.json(contacts);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}


