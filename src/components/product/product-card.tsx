"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";

type ProductCardProps = {
  slug: string;
  name: string;
  price: string | number;
  compareAtPrice?: string | number | null;
  images: string[];
  categorySlug?: string;
  tags?: string[];
  priority?: boolean;
  stock?: number;
  isOutOfStock?: boolean;
};

export function ProductCard({
  slug,
  name,
  price,
  compareAtPrice,
  images,
  priority = false,
  stock = 1,
  isOutOfStock = false,
  categorySlug,
  tags,
}: ProductCardProps) {
  const primary = images[0];
  const secondary = images[1] ?? images[0];

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const saved = localStorage.getItem("almirah_wishlist");
    if (saved) {
      try {
        const list = JSON.parse(saved);
        setIsWishlisted(list.some((p: any) => p.slug === slug));
      } catch {
        // ignore
      }
    }
  }, [slug]);

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const saved = localStorage.getItem("almirah_wishlist");
    let list = saved ? JSON.parse(saved) : [];
    
    if (isWishlisted) {
      list = list.filter((p: any) => p.slug !== slug);
      setIsWishlisted(false);
    } else {
      list.push({
        slug,
        name,
        price,
        compareAtPrice,
        images,
        categorySlug,
        tags,
        stock,
        isOutOfStock
      });
      setIsWishlisted(true);
    }
    localStorage.setItem("almirah_wishlist", JSON.stringify(list));
  }

  return (
    <article className="group relative">
      <Link href={`/product/${slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-beige">
          <Image
            src={primary}
            alt={name}
            fill
            priority={priority}
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
          />
          <Image
            src={secondary}
            alt=""
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
          {/* Only the Save % badge — category/tag badges removed for consistency */}
          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={handleWishlist}
            className={cn(
              "absolute right-3 top-3 rounded-full bg-pearl/80 p-2 backdrop-blur-sm transition z-10",
              mounted && isWishlisted ? "opacity-100 text-red-600" : "opacity-0 group-hover:opacity-100 text-obsidian"
            )}
          >
            <Heart className={cn("h-3.5 w-3.5", mounted && isWishlisted && "fill-current")} />
          </button>
          
          {isOutOfStock || stock === 0 ? (
            <div className="absolute inset-x-0 bottom-0 bg-obsidian/90 px-4 py-3 text-center text-[10px] uppercase tracking-[0.2em] text-pearl/50">
              Sold Out
            </div>
          ) : (
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-obsidian/90 px-4 py-3 text-center text-[10px] uppercase tracking-[0.2em] text-pearl transition duration-500 group-hover:translate-y-0">
              Quick view
            </div>
          )}
        </div>
        <div className="mt-3 space-y-0.5">
          <h3 className="line-clamp-2 font-serif text-sm leading-snug text-obsidian transition group-hover:text-champagne-dark md:text-base">
            {name}
          </h3>
          <div className="flex items-center gap-2 text-[13px]">
            <span className="font-medium">{formatCurrency(price)}</span>
            {compareAtPrice && Number(compareAtPrice) > Number(price) && (
              <>
                <span className="text-obsidian/40 line-through">
                  {formatCurrency(compareAtPrice)}
                </span>
                <span className="text-red-600 font-medium text-[10px] uppercase tracking-[0.1em]">
                  Save {Math.round(((Number(compareAtPrice) - Number(price)) / Number(compareAtPrice)) * 100)}%
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
