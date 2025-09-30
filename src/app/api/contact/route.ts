import { NextRequest, NextResponse } from "next/server";
import { insertContactSchema } from "@shared/schema";
import { storage } from "@/services/storage";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const data = insertContactSchema.parse(json);
    const contact = await storage.createContact(data);
    return NextResponse.json({ success: true, contact });
  } catch (err) {
    return NextResponse.json({ error: "Invalid contact data" }, { status: 400 });
  }
}


