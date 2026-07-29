import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { coupons } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const couponId = parseInt(id);

    if (isNaN(couponId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await db.delete(coupons).where(eq(coupons.id, couponId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete coupon:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const couponId = parseInt(id);
    const body = await request.json();
    const { isActive } = body;

    if (isNaN(couponId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const [updated] = await db
      .update(coupons)
      .set({ isActive })
      .where(eq(coupons.id, couponId))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update coupon:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
