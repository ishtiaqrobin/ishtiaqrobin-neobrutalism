"use client";

import { ProfileForm } from "@/components/modules/profile/ProfileForm";
import { AvatarUpload } from "@/components/modules/profile/AvatarUpload";
import { userService } from "@/services/user.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { User } from "@/types/user.type";
import { Badge } from "@/components/ui/badge";
import { ChangePasswordForm } from "@/components/modules/auth/ChangePasswordForm";
import { Shield, UserCog, User as UserIcon } from "lucide-react";

interface ProfileClientProps {
  userToken: string;
  role: "admin" | "user";
}

export function ProfileClient({ userToken, role }: ProfileClientProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = role === "admin";

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userToken) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const { data, error } = await userService.getMe(userToken);

      if (error) {
        toast.error("Failed to load profile", { description: error.message });
      } else if (data) {
        setUser(data);
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, [userToken]);

  const handleAvatarUpdate = async (file: File) => {
    if (!userToken) return;

    const formData = new FormData();
    formData.append("image", file);

    const { error } = await userService.updateProfile(userToken, formData);

    if (error) {
      toast.error("Failed to update profile picture");
    } else {
      toast.success("Profile picture updated successfully");
      const { data } = await userService.getMe(userToken);
      if (data) setUser(data);
    }
  };

  const handleProfileUpdate = async () => {
    const { data } = await userService.getMe(userToken);
    if (data) setUser(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 w-full">
        <div>
          <Skeleton className="h-9 w-[300px]" />
          <Skeleton className="h-5 w-[450px] mt-2" />
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <Card className="lg:col-span-4 border-primary/10 shadow-lg rounded-3xl overflow-hidden h-fit">
            <div className="h-24 bg-muted/20" />
            <CardContent className="-mt-16 relative flex flex-col items-center">
              <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
              <div className="mt-8 space-y-4 w-full">
                <Skeleton className="h-16 w-full rounded-2xl" />
                <Skeleton className="h-14 w-full rounded-2xl" />
                <Skeleton className="h-14 w-full rounded-2xl" />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-8 border-primary/10 shadow-lg rounded-3xl">
            <CardHeader>
              <Skeleton className="h-7 w-[200px]" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
              <Skeleton className="h-10 w-[150px] rounded-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full pb-10">
      <div>
        <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2">
          ★ PROFILE MANAGEMENT
        </div>
        <h1 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white">
          PROFILE SETTINGS
        </h1>
        <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
          Manage your personal information, avatar, and security credentials.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <Card className="lg:col-span-4 border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-2xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d] overflow-hidden h-fit">
          <div className="h-20 bg-[#00f0ff] border-b-2 border-black" />
          <CardContent className="-mt-14 relative p-6 pt-0">
            <AvatarUpload
              currentImage={user.image}
              onUpdate={handleAvatarUpdate}
              name={user.name}
            />

            <div className="mt-8 space-y-3">
              {isAdmin && (
                <div className="p-3.5 rounded-xl bg-[#b5ff6d] border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_0px_#000]">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-black stroke-[2.5]" />
                    <span className="text-xs font-black uppercase text-black">
                      ROLE
                    </span>
                  </div>
                  <Badge className="bg-black text-white font-black uppercase text-xs tracking-wider">
                    <UserCog className="h-3 w-3 mr-1 stroke-[3]" />
                    ADMIN
                  </Badge>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-[#FFFDF5] dark:bg-zinc-800 border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_0px_#000]">
                <span className="text-xs font-black uppercase text-black dark:text-white">
                  ACCOUNT STATUS
                </span>
                <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded bg-[#00f0ff] text-black border border-black shadow-[1px_1px_0px_0px_#000]">
                  {user.isActive ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFFDF5] dark:bg-zinc-800 border-2 border-black flex items-center justify-between shadow-[2px_2px_0px_0px_#000]">
                <span className="text-xs font-black uppercase text-black dark:text-white">
                  JOINED SINCE
                </span>
                <span className="text-xs font-mono font-bold text-black dark:text-white">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

              {isAdmin && (
                <div className="p-3.5 rounded-xl bg-[#ff597b] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                  <p className="text-xs font-bold text-black leading-relaxed">
                    <Shield className="h-3.5 w-3.5 inline mr-1 stroke-[2.5]" />
                    You have full administrative privileges across all modules.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-8 space-y-8">
          <Card className="border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-2xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d] overflow-hidden">
            <CardHeader className="bg-[#FFFDF5] dark:bg-zinc-950 border-b-2 border-black p-5">
              {isAdmin ? (
                <CardTitle className="text-lg font-clash font-black uppercase text-black dark:text-white">
                  UPDATE INFORMATION
                </CardTitle>
              ) : (
                <>
                  <CardTitle className="text-lg font-clash font-black uppercase flex items-center gap-2 text-black dark:text-white">
                    <UserIcon className="h-5 w-5 text-black dark:text-white stroke-[2.5]" />
                    PROFILE INFORMATION
                  </CardTitle>
                  <CardDescription className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    Update your display name, contact details, and bio.
                  </CardDescription>
                </>
              )}
            </CardHeader>
            <CardContent className="p-6">
              <ProfileForm
                user={user}
                token={userToken}
                onSuccess={handleProfileUpdate}
              />
            </CardContent>
          </Card>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
