"use client";

import { useEffect, useState } from "react";
import {
  User as UserIcon,
  Star,
  Calendar,
  ShieldCheck,
  ArrowRight,
  LayoutDashboard,
  MessageSquare,
  Settings
} from "lucide-react";
import { StatsCard } from "@/components/modules/user/StatsCard";
import { useAuth } from "@/hooks/useAuth";
// import { motion } from "framer-motion";
import { motion } from "motion/react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-8 min-h-screen pb-10">
      {/* Header Section */}
      <motion.div
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border-3 border-black dark:border-zinc-300 relative overflow-hidden shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#b5ff6d]"
      >
        <div className="relative z-10">
          <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-3">
            ★ USER DASHBOARD
          </div>
          <h1 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white">
            {greeting()}, <span className="bg-[#b5ff6d] text-black px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_#000]">{user?.name}</span>!
          </h1>
          <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mt-3 max-w-md border-l-4 border-black pl-3">
            Welcome back to your member dashboard. Here's an overview of your account and activities.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <Link href="/user-dashboard/profile">
              <Button
                size="lg"
                className="bg-[#b5ff6d] text-black hover:bg-[#a2f059] font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000]">
                EDIT PROFILE ★
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                className="bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-zinc-100 font-black uppercase text-xs border-2 border-black shadow-[3px_3px_0px_0px_#000]">
                VIEW PORTFOLIO
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center relative z-10">
          <Avatar className="h-28 w-28 border-3 border-black shadow-[4px_4px_0px_0px_#000]">
            <AvatarImage src={user?.image || ""} alt={user?.name} />
            <AvatarFallback className="text-3xl bg-[#00f0ff] text-black font-black">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Account Status"
          value={user?.isActive ? "Active" : "Pending"}
          description="Your current account state"
          icon={ShieldCheck}
        />
        <StatsCard
          title="Reviews Given"
          value={user?.isReviewed ? "1" : "0"}
          description={user?.isReviewed ? "Thank you for your feedback!" : "You haven't reviewed yet"}
          icon={Star}
        />
        <StatsCard
          title="Member Since"
          value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : "N/A"}
          description="When you joined our platform"
          icon={Calendar}
        />
        <StatsCard
          title="Role"
          value={user?.role || "User"}
          description="Your current access level"
          icon={UserIcon}
        />
      </div>

      {/* Quick Links & Info */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[5px_5px_0px_0px_#000] dark:shadow-[5px_5px_0px_0px_#b5ff6d] overflow-hidden">
          <CardHeader className="bg-[#00f0ff] border-b-2 border-black p-4">
            <CardTitle className="flex items-center gap-2 text-base font-black font-clash uppercase text-black">
              <MessageSquare className="h-5 w-5 stroke-[2.5]" />
              REVIEW MANAGEMENT
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-6">
              {user?.isReviewed
                ? "You have shared your feedback. You can update or delete your review anytime."
                : "Share your experience working with Ishtiaq. Your feedback is greatly appreciated!"}
            </p>
            <Link href="/user-dashboard/review">
              <Button
                size="lg"
                className="w-full bg-[#b5ff6d] text-black hover:bg-[#a2f059] font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000]">
                {user?.isReviewed ? "MANAGE MY REVIEW ★" : "WRITE A REVIEW ★"}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[5px_5px_0px_0px_#000] dark:shadow-[5px_5px_0px_0px_#b5ff6d] overflow-hidden">
          <CardHeader className="bg-[#ff597b] border-b-2 border-black p-4">
            <CardTitle className="flex items-center gap-2 text-base font-black font-clash uppercase text-black">
              <UserIcon className="h-5 w-5 stroke-[2.5]" />
              PERSONAL PROFILE
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-6">
              Keep your profile information up to date to ensure the best experience.
            </p>
            <Link href="/user-dashboard/profile">
              <Button
                size="lg"
                className="w-full bg-[#b5ff6d] text-black hover:bg-[#a2f059] font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000]">
                UPDATE INFORMATION ★
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[5px_5px_0px_0px_#000] dark:shadow-[5px_5px_0px_0px_#b5ff6d] overflow-hidden">
          <CardHeader className="bg-[#b5ff6d] border-b-2 border-black p-4">
            <CardTitle className="flex items-center gap-2 text-base font-black font-clash uppercase text-black">
              <Settings className="h-5 w-5 stroke-[2.5]" />
              ACCOUNT SETTINGS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-6">
              Manage your security, password, and account preferences here.
            </p>
            <Link href="/user-dashboard/profile">
              <Button
                size="lg"
                className="w-full bg-[#00f0ff] text-black hover:bg-[#00d0df] font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000]">
                SECURITY SETTINGS ★
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
