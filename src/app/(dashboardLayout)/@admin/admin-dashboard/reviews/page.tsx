"use client";

import { useEffect, useState, useCallback } from "react";
import { reviewService } from "@/services/review.service";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { IReview } from "@/types";
import { AdminReviewManager } from "@/components/modules/dashboard/admin/review/AdminReviewManager";

export default function AdminReviewsPage() {
  const { session, isLoading: authLoading } = useAuth();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userToken = session?.token || "";

  const fetchReviews = useCallback(async () => {
    if (!userToken) return;
    setIsLoading(true);
    const { data, error } = await reviewService.getAllReviewsAdmin(userToken);
    if (error) {
      toast.error("Failed to load reviews", { description: error.message });
      setReviews([]);
    } else {
      setReviews(data || []);
    }
    setIsLoading(false);
  }, [userToken]);

  useEffect(() => {
    if (authLoading) return;
    const load = async () => {
      await fetchReviews();
    };
    load();
  }, [authLoading, fetchReviews]);

  return (
    <div className="space-y-6 min-h-screen pb-20">
      <div>
        <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2">
          ★ REVIEWS & FEEDBACK
        </div>
        <h1 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white">
          USER TESTIMONIALS
        </h1>
        <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
          Manage, approve, pin, and edit feedback from your clients and platform users
        </p>
      </div>

      <AdminReviewManager
        reviews={reviews}
        token={userToken}
        onRefresh={fetchReviews}
        isLoading={isLoading || authLoading}
      />
    </div>
  );
}
