import { notFound } from "next/navigation";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const orderId = Number(params.id);
  if (isNaN(orderId)) return notFound();

  const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!order) return notFound();

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  const shippingAddress: any = order.shippingAddress || {};

  return (
    <div className="min-h-screen bg-obsidian text-pearl p-6 md:p-12 lg:ml-64">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-xs uppercase tracking-widest text-champagne hover:text-white transition-colors">
              &larr; Back to Dashboard
            </Link>
            <h1 className="font-serif text-3xl mt-4">Order {order.orderNumber}</h1>
            <p className="text-sm text-pearl/60 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div className="flex gap-4">
            <a 
              href={`/admin/orders/${order.id}/label`} 
              target="_blank" 
              className="border border-champagne text-champagne px-4 py-2 text-xs uppercase tracking-widest hover:bg-champagne/10 transition-colors"
            >
              Print Label
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-pearl/[0.03] border border-pearl/10 p-6">
              <h2 className="text-[11px] uppercase tracking-widest text-pearl/50 mb-4 border-b border-pearl/10 pb-2">Items Ordered</h2>
              
              <ul className="space-y-4">
                {items.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    {item.productImage ? (
                      <div className="w-16 h-20 bg-pearl/5 overflow-hidden shrink-0">
                        <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-20 bg-pearl/5 flex items-center justify-center shrink-0">
                        <span className="text-[10px] uppercase text-pearl/30">No Img</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.productName}</h3>
                      <p className="text-xs text-pearl/50 mt-1">Size: {item.size} | Color: {item.color}</p>
                      <p className="text-xs text-pearl/50 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(item.unitPrice)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-4 border-t border-pearl/10 flex justify-end">
                <div className="w-64 space-y-2 text-sm">
                  <div className="flex justify-between text-pearl/60">
                    <span>Subtotal</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-pearl/60">
                    <span>Shipping</span>
                    <span>{formatCurrency(order.shipping)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-white border-t border-pearl/20 pt-2 mt-2">
                    <span>Total</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-pearl/[0.03] border border-pearl/10 p-6">
              <h2 className="text-[11px] uppercase tracking-widest text-pearl/50 mb-4 border-b border-pearl/10 pb-2">Customer Info</h2>
              <div className="space-y-1 text-sm">
                <p className="font-medium text-white">{order.customerName}</p>
                <p className="text-pearl/60"><a href={`mailto:${order.customerEmail}`}>{order.customerEmail}</a></p>
                {shippingAddress.phone && <p className="text-pearl/60"><a href={`tel:${shippingAddress.phone}`}>{shippingAddress.phone}</a></p>}
              </div>
            </section>
            
            <section className="bg-pearl/[0.03] border border-pearl/10 p-6">
              <h2 className="text-[11px] uppercase tracking-widest text-pearl/50 mb-4 border-b border-pearl/10 pb-2">Shipping Address</h2>
              <div className="space-y-1 text-sm text-pearl/80">
                <p>{shippingAddress.line1}</p>
                {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
                <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
                <p>{shippingAddress.country || "India"}</p>
              </div>
            </section>

            <section className="bg-pearl/[0.03] border border-pearl/10 p-6">
              <h2 className="text-[11px] uppercase tracking-widest text-pearl/50 mb-4 border-b border-pearl/10 pb-2">Status</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-pearl/50 block text-[10px] uppercase">Order Status</span>
                  <span className="text-champagne font-medium uppercase text-xs tracking-wider">{order.status.replace(/_/g, " ")}</span>
                </div>
                {order.trackingNumber && (
                  <div>
                    <span className="text-pearl/50 block text-[10px] uppercase">Tracking</span>
                    <span className="text-white">{order.courier} &middot; {order.trackingNumber}</span>
                  </div>
                )}
              </div>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
}
