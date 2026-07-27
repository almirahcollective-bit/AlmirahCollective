import { NextResponse } from "next/server";
import { db } from "@/db";
import { complaints } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, ticketNumber, customerEmail, customerName, type, reason } = body;

    if (!orderId || !ticketNumber || !customerEmail || !customerName || !type || !reason) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await db.insert(complaints).values({
      orderId,
      ticketNumber,
      customerEmail,
      customerName,
      type,
      reason,
      status: "open",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Complaint error:", error);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}
