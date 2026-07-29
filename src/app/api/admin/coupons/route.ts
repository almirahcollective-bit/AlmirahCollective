import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { coupons } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const allCoupons = await db.select().from(coupons).orderBy(desc(coupons.createdAt));
    return NextResponse.json(allCoupons);
  } catch (error) {
    console.error("Failed to fetch coupons:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, discountAmount, minOrderAmount, isActive } = body;

    if (!code || !discountAmount) {
      return NextResponse.json(
        { error: "Code and discount amount are required" },
        { status: 400 }
      );
    }

    const [newCoupon] = await db.insert(coupons).values({
      code: code.toUpperCase(),
      discountAmount: discountAmount.toString(),
      minOrderAmount: (minOrderAmount || 0).toString(),
      isActive: isActive ?? true
    }).returning();

    return NextResponse.json(newCoupon);
  } catch (error: any) {
    console.error("Failed to create coupon:", error);
    if (error.code === '23505') { // unique violation
      return NextResponse.json(
        { error: "Coupon code already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
