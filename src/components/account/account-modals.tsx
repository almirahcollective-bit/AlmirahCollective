"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import type { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

export function ComplaintModal({
  isOpen,
  onClose,
  type,
  orderId,
  orderNumber,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  type: "cancel" | "return" | "replace";
  orderId: number;
  orderNumber: string;
  user: User;
}) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reason.trim()) return setError("Please provide a valid reason.");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/account/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          ticketNumber: `TKT-${Math.floor(Date.now() / 1000)}`,
          customerEmail: user.email,
          customerName: user.user_metadata?.first_name || "Customer",
          type,
          reason,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit request.");
      }
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setReason("");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  const title = type === "cancel" ? "Cancel Order" : type === "return" ? "Return Request" : "Replacement Request";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/60 p-5 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-pearl p-8 shadow-2xl">
        <button onClick={onClose} className="absolute right-5 top-5 text-obsidian/50 hover:text-obsidian">
          <X className="h-5 w-5" />
        </button>
        {success ? (
          <div className="py-10 text-center">
            <h3 className="font-serif text-2xl text-obsidian">Request Submitted</h3>
            <p className="mt-2 text-sm text-obsidian/60">Your request has been sent for review.</p>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-2xl text-obsidian">{title}</h2>
            <p className="mt-2 text-sm text-obsidian/60">Order {orderNumber}</p>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-widest text-obsidian/60">Reason</label>
                <textarea
                  required
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please describe why you want to make this request..."
                  className="w-full resize-none border border-obsidian/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-obsidian"
                />
              </div>
              <MagneticButton type="submit" disabled={loading} className="mt-2 w-full justify-center">
                {loading ? "Submitting..." : "Submit Request"}
              </MagneticButton>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function ReviewModal({
  isOpen,
  onClose,
  productId,
  productName,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
  user: User;
}) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return setError("Please write a review.");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/account/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          customerName: user.user_metadata?.first_name || "Verified Customer",
          rating,
          title,
          body,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review.");
      }
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setRating(5);
        setTitle("");
        setBody("");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/60 p-5 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-pearl p-8 shadow-2xl">
        <button onClick={onClose} className="absolute right-5 top-5 text-obsidian/50 hover:text-obsidian">
          <X className="h-5 w-5" />
        </button>
        {success ? (
          <div className="py-10 text-center">
            <h3 className="font-serif text-2xl text-obsidian">Review Submitted</h3>
            <p className="mt-2 text-sm text-obsidian/60">Thank you! Your review is pending approval.</p>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-2xl text-obsidian">Write a Review</h2>
            <p className="mt-2 line-clamp-1 text-sm text-obsidian/60">{productName}</p>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-widest text-obsidian/60">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-colors hover:text-champagne-dark"
                    >
                      <Star className={cn("h-6 w-6", rating >= star ? "fill-champagne-dark text-champagne-dark" : "text-obsidian/20")} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-widest text-obsidian/60">Title (Optional)</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summary of your experience"
                  className="w-full border border-obsidian/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-obsidian"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-widest text-obsidian/60">Review</label>
                <textarea
                  required
                  rows={4}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="What did you like about it?"
                  className="w-full resize-none border border-obsidian/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-obsidian"
                />
              </div>
              <MagneticButton type="submit" disabled={loading} className="mt-2 w-full justify-center">
                {loading ? "Submitting..." : "Submit Review"}
              </MagneticButton>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
