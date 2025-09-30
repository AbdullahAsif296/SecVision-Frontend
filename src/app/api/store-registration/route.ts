import { NextRequest, NextResponse } from "next/server";
import { insertStoreRegistrationSchema } from "@shared/schema";
import { storage } from "@/services/storage";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const data = insertStoreRegistrationSchema.parse(json);
    const registration = await storage.createStoreRegistration(data);
    return NextResponse.json({ success: true, registration });
  } catch (err) {
    return NextResponse.json({ error: "Invalid registration data" }, { status: 400 });
  }
}


