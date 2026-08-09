import type { Metadata } from "next";
import { BRAND } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: `Shipping policy for ${BRAND.name}.`,
};

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-36">
      <p className="text-[10px] uppercase tracking-[0.3em] text-champagne-dark">
        Support
      </p>
      <h1 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl">
        Shipping Policy
      </h1>
      <p className="mt-4 text-sm text-obsidian/60">
        Updated for {BRAND.name} · Bengaluru-based operations
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-obsidian/70">
        <section>
          <h2 className="font-serif text-2xl text-obsidian">Order Processing & Shipping</h2>
          <p className="mt-3">
            All orders are processed and packed within <strong>1 to 3 business days</strong> from our Bengaluru fulfillment center (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
          </p>
          <p className="mt-3">
            Delays can happen due to high volume during festivals, weather disruptions, courier delays, or verification issues. If there is a significant delay in the shipment of your order, we will contact you via email or telephone.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-obsidian">Domestic Shipping Rates and Estimates</h2>
          <p className="mt-3">
            We provide <strong>free shipping on all orders above ₹{BRAND.freeShippingThreshold}</strong>. For orders below this threshold, shipping charges will be calculated and displayed at checkout.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong>Metro cities:</strong> 3–7 business days in transit</li>
            <li><strong>Rest of India:</strong> 5–10 business days in transit</li>
            <li><strong>Remote locations:</strong> longer delays may apply</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-obsidian">How do I check the status of my order?</h2>
          <p className="mt-3">
            When your order has shipped, you will receive an email and/or SMS notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-obsidian">Contact Us</h2>
          <p className="mt-3">
            For shipping support, contact us at:
            <br />
            Email: <a href={`mailto:${BRAND.email}`} className="text-champagne-dark">{BRAND.email}</a>
            <br />
            Phone: {BRAND.phone}
            <br />
            Address: {BRAND.address}
          </p>
        </section>
      </div>
    </div>
  );
}
