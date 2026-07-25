import { notFound } from "next/navigation";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PrintButton } from "./print-button";

export default async function ShippingLabelPage({ params }: { params: { id: string } }) {
  const orderId = Number(params.id);
  if (isNaN(orderId)) return notFound();

  const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!order) return notFound();

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));

  const shippingAddress: any = order.shippingAddress || {};

  return (
    <div className="bg-white min-h-screen text-black flex items-center justify-center print:bg-white print:p-0 p-8">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-label, #printable-label * {
            visibility: visible;
          }
          #printable-label {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }
        }
      `}} />

      <div id="printable-label" className="w-full max-w-[4in] border-2 border-black p-4 bg-white shadow-xl print:shadow-none print:border-none print:max-w-none print:w-[4in] print:h-[6in]">
        
        {/* Header - Sender Info */}
        <div className="border-b-2 border-black pb-3 mb-3">
          <div className="flex justify-between items-start">
            <h1 className="font-serif text-2xl font-bold tracking-tight leading-none">ALMIRAH<br/>COLLECTIVE</h1>
            <div className="text-right text-[10px] leading-tight">
              <strong>Sender:</strong><br />
              Almirah Collective<br />
              Bengaluru Studio<br />
              Karnataka, India 560001
            </div>
          </div>
        </div>

        {/* Recipient Info - LARGE */}
        <div className="mb-4">
          <div className="text-[10px] uppercase font-bold tracking-wider mb-1">SHIP TO:</div>
          <h2 className="text-xl font-bold uppercase">{order.customerName}</h2>
          <div className="text-sm mt-1 leading-snug font-medium">
            <p>{shippingAddress.line1}</p>
            {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
            <p className="mt-1">{shippingAddress.country || "India"}</p>
          </div>
          
          <div className="mt-2 text-sm">
            <p><strong>Phone:</strong> {shippingAddress.phone || order.customerEmail}</p>
          </div>
        </div>

        {/* Order Details & Barcode Fake */}
        <div className="border-t-2 border-b-2 border-black py-3 mb-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[10px] font-bold uppercase">Order #</div>
              <div className="text-lg font-mono font-bold tracking-widest">{order.orderNumber}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-right">Date</div>
              <div className="text-sm font-mono">{new Date(order.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
          
          {/* Simulated Barcode */}
          <div className="mt-4 text-center">
            <div className="h-16 w-full flex">
              {Array.from({ length: 45 }).map((_, i) => (
                <div key={i} className={`h-full bg-black ${i % 3 === 0 ? 'w-2' : i % 5 === 0 ? 'w-1' : 'w-0.5'} ${i % 2 === 0 ? 'mr-0.5' : 'mr-1'}`} />
              ))}
            </div>
            <div className="text-[10px] font-mono tracking-[0.3em] mt-1">{order.orderNumber}</div>
          </div>
        </div>

        {/* Items Summary */}
        <div className="text-[10px]">
          <div className="font-bold uppercase mb-1 border-b border-black pb-1">Contents ({items.length})</div>
          <ul className="space-y-1">
            {items.map((item: any, idx: number) => (
              <li key={idx} className="flex justify-between">
                <span className="truncate pr-2">{item.quantity}x {item.productName} ({item.size})</span>
                <span className="whitespace-nowrap">SKU-{item.productId}</span>
              </li>
            ))}
          </ul>
        </div>

        <PrintButton />
      </div>
    </div>
  );
}
