import type { Metadata } from "next";
import { BRAND } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description: `Return and refund policy for ${BRAND.name}.`,
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-36">
      <p className="text-[10px] uppercase tracking-[0.3em] text-champagne-dark">
        Support
      </p>
      <h1 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl">
        Return & Refund Policy
      </h1>
      <p className="mt-4 text-sm text-obsidian/60">
        Updated for {BRAND.name} · Bengaluru-based operations
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-obsidian/70">
        <section>
          <h2 className="font-serif text-2xl text-obsidian">Returns and exchanges</h2>
          <p className="mt-3">
            Because many items are single-piece curated finds, returns are accepted only where eligible. You may request a return or exchange within <strong>7 days of delivery</strong>.
          </p>
          <p className="mt-3">
            To be eligible for a return, your item must be in the same condition that you received it:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Unworn, unwashed, and in original condition</li>
            <li>With original tags and packaging intact</li>
            <li>Not marked as final sale, altered, or customized</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-obsidian">Return Shipping & Fees</h2>
          <p className="mt-3">
            We are pleased to offer <strong>free returns</strong>. We will provide a pre-paid shipping label for your return.
            There is <strong>no restocking fee</strong> for returned items.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-obsidian">Refunds</h2>
          <p className="mt-3">
            Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed and automatically applied to your original method of payment within 5-7 business days.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-obsidian">Damaged or wrong items</h2>
          <p className="mt-3">
            If you received a damaged, defective, incorrect, or missing item, contact us within
            48 hours of delivery with photos or a short video along with your order number. We will arrange a replacement or refund immediately.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-obsidian">How to start a return</h2>
          <p className="mt-3">
            To initiate a return or exchange, please contact us at:
            <br />
            Email: <a href={`mailto:${BRAND.email}`} className="text-champagne-dark">{BRAND.email}</a>
            <br />
            Phone: {BRAND.phone}
            <br />
            WhatsApp: <a href={`https://wa.me/${BRAND.whatsapp.replace("+", "")}`} className="text-champagne-dark" target="_blank" rel="noreferrer">Connect on WhatsApp</a>
          </p>
        </section>
      </div>
    </div>
  );
}
