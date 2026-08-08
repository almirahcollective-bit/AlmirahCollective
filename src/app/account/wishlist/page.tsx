"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { MagneticButton } from "@/components/ui/magnetic-button";
import type { User } from "@supabase/supabase-js";
import { ProductCard } from "@/components/product/product-card";

export const dynamic = "force-dynamic";

export default function WishlistPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<any[]>([]);

  async function fetchWishlist(userId: string) {
    try {
      // In a real application, you'd fetch by user.id if it's connected to `customers` table
      // But since we might be mocking it for now, let's just use local storage as fallback
      // Because `wishlist_items` requires `customer_id` which might be a numeric ID from `customers` table
      // We will just read from local storage for the easiest integration without deep DB relations
      
      const saved = localStorage.getItem("almirah_wishlist");
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) {
        router.replace("/account/login");
      } else {
        setUser(data.session.user);
        fetchWishlist(data.session.user.id);
      }
    });

    return () => {
      mounted = false;
    };
  }, [router]);



  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-32">
        <p className="text-sm text-obsidian/50">Loading wishlist...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-32 md:px-8 md:pt-36">
      <div className="flex flex-col justify-between gap-6 border-b border-obsidian/10 pb-10 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-champagne-dark">
            Client portal
          </p>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl">Your Wishlist</h1>
        </div>
        <MagneticButton href="/account" variant="ghost">
          Back to Account
        </MagneticButton>
      </div>

      <div className="mt-16">
        {wishlist.length === 0 ? (
          <div className="text-center">
            <p className="text-sm text-obsidian/50">Your wishlist is empty.</p>
            <MagneticButton href="/shop" className="mt-6">
              Start shopping
            </MagneticButton>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6 md:gap-y-16">
            {wishlist.map((product) => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
