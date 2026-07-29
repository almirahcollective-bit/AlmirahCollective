import { NextRequest, NextResponse } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { coupons } from "@/db/schema";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const subtotal = searchParams.get("subtotal");

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const subtotalValue = subtotal ? parseFloat(subtotal) : 0;

    const [coupon] = await db
      .select()
      .from(coupons)
      .where(eq(coupons.code, code.toUpperCase()));

    if (!coupon) {
      return NextResponse.json({ error: "Invalid discount code" }, { status: 404 });
    }

    if (!coupon.isActive) {
      return NextResponse.json({ error: "This discount code is inactive" }, { status: 400 });
    }

    if (subtotalValue < parseFloat(coupon.minOrderAmount)) {
      return NextResponse.json({ 
        error: `Minimum order amount of ₹${coupon.minOrderAmount} required for this code` 
      }, { status: 400 });
    }

    return NextResponse.json({
      code: coupon.code,
      discountAmount: parseFloat(coupon.discountAmount)
    });
  } catch (error) {
    console.error("Coupon validation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
