"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { SettingsManager } from "@/components/modules/dashboard/admin/settings/SettingsManager";
import { settingService } from "@/services/setting.service";
import { useAuth } from "@/hooks/useAuth";
import type { ISettings } from "@/types";

export default function AdminSettingsPage() {
  const { session, isLoading: authLoading } = useAuth();
  const userToken = session?.token || "";

  const [settings, setSettings] = useState<ISettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await settingService.getSettings();

    if (error) {
      toast.error("Failed to load settings", { description: error.message });
    }

    setSettings(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!authLoading) {
      Promise.resolve().then(() => fetchAll());
    }
  }, [authLoading, fetchAll]);

  return (
    <div className="min-h-screen space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2">
            ★ SYSTEM CONFIGURATION
          </div>
          <h1 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white">
            PLATFORM SETTINGS
          </h1>
          <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
            Manage your social links, contact info, professional metadata, and SEO details
          </p>
        </div>
        <Button
          onClick={fetchAll}
          disabled={isLoading}
          className="bg-[#00f0ff] text-black hover:bg-[#00d0df] border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
        >
          <RefreshCcw className="mr-2 h-4 w-4 stroke-[2.5]" />
          REFRESH ★
        </Button>
      </div>

      <SettingsManager
        settings={settings}
        token={userToken}
        onRefresh={fetchAll}
        isLoading={isLoading}
      />
    </div>
  );
}
