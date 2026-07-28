"use client";

import Link from "next/link";
import { Tag } from "lucide-react";
import { BRAND } from "@/lib/catalog";

/**
 * High-contrast nav banner: brand pill + live discount code.
 * Sits at the top of the header stack as a divider/promo strip.
 */
export function AnnouncementBar() {
  return (
    <div className="border-b border-champagne/25 bg-obsidian text-pearl overflow-hidden">
      <div className="mx-auto flex max-w-[1440px] items-center sm:justify-center gap-x-4 gap-y-1 px-4 py-2 text-center">
        <Link href="/" className="hidden shrink-0 items-center rounded-full border border-champagne/40 px-3 py-0.5 font-serif text-[11px] tracking-[0.18em] text-champagne sm:inline-flex hover:bg-champagne/10 transition-colors">
          {BRAND.name}
        </Link>
        <div className="flex overflow-hidden whitespace-nowrap sm:w-auto w-full">
          <p className="flex items-center gap-x-2 text-[11px] tracking-[0.1em] md:text-[12px] animate-marquee sm:animate-none">
            <span className="text-pearl/80">First order?</span>
            <span className="inline-flex items-center gap-1 font-medium text-champagne">
              <Tag className="h-3 w-3" />
              Use Code
              <span className="rounded bg-champagne/20 px-1.5 py-0.5 font-mono tracking-widest text-pearl">
                {BRAND.discountCode}
              </span>
              for {BRAND.discountPercent}% off
            </span>
            <span className="text-pearl/40 inline sm:hidden mx-2">·</span>
            <span className="text-pearl/70 inline sm:hidden">
              Free shipping over ₹{BRAND.freeShippingThreshold}
            </span>

            {/* Duplicate for seamless scrolling on mobile */}
            <span className="text-pearl/40 inline sm:hidden mx-2">·</span>
            <span className="text-pearl/80 inline sm:hidden">First order?</span>
            <span className="inline-flex items-center gap-1 font-medium text-champagne sm:hidden ml-2">
              <Tag className="h-3 w-3" />
              Use Code
              <span className="rounded bg-champagne/20 px-1.5 py-0.5 font-mono tracking-widest text-pearl">
                {BRAND.discountCode}
              </span>
              for {BRAND.discountPercent}% off
            </span>
            <span className="text-pearl/40 inline sm:hidden mx-2">·</span>
            <span className="text-pearl/70 inline sm:hidden">
              Free shipping over ₹{BRAND.freeShippingThreshold}
            </span>

            {/* Desktop extras (hidden on mobile) */}
            <span className="hidden text-pearl/40 sm:inline mx-2">·</span>
            <span className="hidden text-pearl/70 sm:inline">
              Free shipping over ₹{BRAND.freeShippingThreshold}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
