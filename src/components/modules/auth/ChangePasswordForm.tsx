"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  Loader2,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  KeyRound,
} from "lucide-react";

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.changePassword({
        newPassword: newPassword,
        currentPassword: currentPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || "Failed to change password");
        return;
      }

      toast.success("Password changed successfully! 🎉");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Change password error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-2xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d] overflow-hidden">
      <CardHeader className="bg-[#FFFDF5] dark:bg-zinc-950 border-b-2 border-black p-5">
        <CardTitle className="text-lg font-clash font-black uppercase flex items-center gap-2 text-black dark:text-white">
          <ShieldCheck className="h-5 w-5 text-black dark:text-white stroke-[2.5]" />
          CHANGE PASSWORD ★
        </CardTitle>
        <CardDescription className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
          Ensure your account is using a strong, unique password for maximum security.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="currentPassword" className="text-xs font-black uppercase text-black dark:text-white">CURRENT PASSWORD</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-black dark:text-white stroke-[2.5]" />
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 h-11 border-2 border-black rounded-lg font-bold text-sm focus:shadow-[3px_3px_0px_0px_#000] transition-all"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-3.5 text-black dark:text-white cursor-pointer"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4 stroke-[2.5]" />
                ) : (
                  <Eye className="h-4 w-4 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="newPassword" className="text-xs font-black uppercase text-black dark:text-white">NEW PASSWORD</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-black dark:text-white stroke-[2.5]" />
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 h-11 border-2 border-black rounded-lg font-bold text-sm focus:shadow-[3px_3px_0px_0px_#000] transition-all"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3.5 text-black dark:text-white cursor-pointer"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 stroke-[2.5]" />
                ) : (
                  <Eye className="h-4 w-4 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-xs font-black uppercase text-black dark:text-white">CONFIRM NEW PASSWORD</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-black dark:text-white stroke-[2.5]" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 h-11 border-2 border-black rounded-lg font-bold text-sm focus:shadow-[3px_3px_0px_0px_#000] transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-black dark:text-white cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 stroke-[2.5]" />
                ) : (
                  <Eye className="h-4 w-4 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full bg-[#00f0ff] text-black hover:bg-[#00d0df] font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] cursor-pointer mt-2"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <KeyRound className="h-4 w-4 mr-2 stroke-[2.5]" />
            )}
            UPDATE PASSWORD ★
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
