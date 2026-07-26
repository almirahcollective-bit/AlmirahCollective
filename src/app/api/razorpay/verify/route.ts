import { NextResponse } from 'next/server'
import { db } from '@/db'
import { orders } from '@/db/schema'
import { eq } from 'drizzle-orm'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { 
      orderNumber, 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature 
    } = body

    if (!orderNumber || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment verification details' }, { status: 400 })
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret'
    
    // Verify signature
    const text = razorpay_order_id + "|" + razorpay_payment_id
    const generated_signature = crypto
      .createHmac('sha256', keySecret)
      .update(text)
      .digest('hex')

    // If using dummy keys, we'll bypass signature check for sandbox testing
    if (keySecret !== 'dummy_key_secret' && generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    // Update order status to placed
    await db
      .update(orders)
      .set({ 
        status: "placed" 
      })
      .where(eq(orders.orderNumber, orderNumber))

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Razorpay Verify Error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
