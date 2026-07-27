import { NextResponse } from "next/server";
import { db } from "@/db";
import { reviews } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, customerName, rating, title, body: reviewBody } = body;

    if (!productId || !customerName || !rating || !reviewBody) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await db.insert(reviews).values({
      productId,
      customerName,
      rating,
      title,
      body: reviewBody,
      isVerified: true,
      isApproved: false, // Requires admin approval
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Review error:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
