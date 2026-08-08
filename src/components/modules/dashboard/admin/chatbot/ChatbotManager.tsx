"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Bot,
  Key,
  Settings,
  Eye,
  EyeOff,
  Save,
  Loader2,
  Cpu,
  Thermometer,
  Hash,
  Link,
  ToggleLeft,
  MessageSquare,
  Trash2,
  Database,
  AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  upsertAiProviderConfigAction,
  upsertChatbotConfigAction,
  getChatbotLogsAction,
  deleteChatbotLogsAction,
} from "@/actions/chatbot.action";
import type {
  IAiProviderConfig,
  IChatbotConfig,
  IChatbotLog,
} from "@/types/chatbot.type";

interface ChatbotManagerProps {
  aiConfig: IAiProviderConfig | null;
  chatbotConfig: IChatbotConfig | null;
  token: string;
}

const PROVIDER_PRESETS: Record<
  string,
  { endpoint: string; modelPlaceholder: string; docsUrl: string }
> = {
  gemini: {
    endpoint: "",
    modelPlaceholder: "gemini-2.0-flash",
    docsUrl: "https://aistudio.google.com",
  },
  openai: {
    endpoint: "https://api.openai.com/v1/chat/completions",
    modelPlaceholder: "gpt-4o-mini",
    docsUrl: "https://platform.openai.com",
  },
  groq: {
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    modelPlaceholder: "llama-3.3-70b-versatile",
    docsUrl: "https://console.groq.com",
  },
  custom: {
    endpoint: "",
    modelPlaceholder: "your-model-name",
    docsUrl: "",
  },
};

export function ChatbotManager({
  aiConfig,
  chatbotConfig,
  token,
}: ChatbotManagerProps) {
  // ── AI Config state ───────────────────────────────────────
  const [provider, setProvider] = useState(aiConfig?.provider ?? "gemini");
  const [apiKey, setApiKey] = useState(aiConfig?.apiKey ?? "");
  const [model, setModel] = useState(aiConfig?.model ?? "");
  const [endpoint, setEndpoint] = useState(aiConfig?.endpoint ?? "");
  const [maxTokens, setMaxTokens] = useState(aiConfig?.maxTokens ?? 1000);
  const [temperature, setTemperature] = useState(aiConfig?.temperature ?? 0.7);
  const [aiEnabled, setAiEnabled] = useState(aiConfig?.isEnabled ?? true);
  const [showKey, setShowKey] = useState(false);
  const [aiSaving, setAiSaving] = useState(false);

  // ── Chatbot Config state ──────────────────────────────────
  const [botEnabled, setBotEnabled] = useState(
    chatbotConfig?.isEnabled ?? true,
  );
  const [botName, setBotName] = useState(
    chatbotConfig?.botName ?? "Ishtiaq's Assistant",
  );
  const [welcomeMsg, setWelcomeMsg] = useState(chatbotConfig?.welcomeMsg ?? "");
  const [systemPrompt, setSystemPrompt] = useState(
    chatbotConfig?.systemPrompt ?? "",
  );
  const [botSaving, setBotSaving] = useState(false);

  // ── Chat Logs state ──────────────────────────────────────
  const [logs, setLogs] = useState<IChatbotLog[]>([]);
  const [logTotal, setLogTotal] = useState(0);
  const [logsLoading, setLogsLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    let cancelled = false;

    getChatbotLogsAction(token, 50).then((result) => {
      if (cancelled) return;
      if (result.success && result.data) {
        setLogs(result.data.data ?? []);
        setLogTotal(result.data.meta?.total ?? 0);
      }
      setLogsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleClearAllLogs = async () => {
    setClearing(true);
    const result = await deleteChatbotLogsAction(token);
    if (result.success) {
      toast.success(result.message);
      setLogs([]);
      setLogTotal(0);
      setConfirmClear(false);
    } else {
      toast.error(result.message);
    }
    setClearing(false);
  };

  // ── Provider change — auto-fill preset ───────────────────
  const handleProviderChange = (val: string) => {
    setProvider(val);
    const preset = PROVIDER_PRESETS[val];
    if (preset) {
      setEndpoint(preset.endpoint);
      if (!model) setModel(preset.modelPlaceholder);
    }
  };

  // ── Save AI config ────────────────────────────────────────
  const handleSaveAiConfig = async () => {
    if (!apiKey || !model || !provider) {
      toast.error("Provider, API Key, and Model are required");
      return;
    }

    setAiSaving(true);
    const result = await upsertAiProviderConfigAction(
      {
        provider,
        apiKey,
        model,
        endpoint: endpoint || null,
        maxTokens,
        temperature,
        isEnabled: aiEnabled,
      },
      token,
    );

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setAiSaving(false);
  };

  // ── Save chatbot config ───────────────────────────────────
  const handleSaveBotConfig = async () => {
    setBotSaving(true);
    const result = await upsertChatbotConfigAction(
      {
        isEnabled: botEnabled,
        botName: botName || undefined,
        welcomeMsg: welcomeMsg || undefined,
        systemPrompt: systemPrompt || undefined,
      },
      token,
    );

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setBotSaving(false);
  };

  const preset = PROVIDER_PRESETS[provider];

  return (
    <Tabs defaultValue="ai-config" className="space-y-6">
      <TabsList className="grid grid-cols-3 w-full max-w-md border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 rounded-xl p-1.5 shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#b5ff6d]">
        <TabsTrigger value="ai-config" className="gap-2 font-black uppercase text-xs data-[state=active]:bg-[#b5ff6d] data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black data-[state=active]:shadow-[2px_2px_0px_0px_#000] cursor-pointer">
          <Key className="h-3.5 w-3.5 stroke-[2.5]" />
          AI PROVIDER
        </TabsTrigger>
        <TabsTrigger value="bot-config" className="gap-2 font-black uppercase text-xs data-[state=active]:bg-[#b5ff6d] data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black data-[state=active]:shadow-[2px_2px_0px_0px_#000] cursor-pointer">
          <Settings className="h-3.5 w-3.5 stroke-[2.5]" />
          CHATBOT
        </TabsTrigger>
        <TabsTrigger value="logs" className="gap-2 font-black uppercase text-xs data-[state=active]:bg-[#b5ff6d] data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black data-[state=active]:shadow-[2px_2px_0px_0px_#000] cursor-pointer">
          <Database className="h-3.5 w-3.5 stroke-[2.5]" />
          LOGS ({logTotal})
        </TabsTrigger>
      </TabsList>

      {/* ── AI Provider Config ── */}
      <TabsContent value="ai-config" className="space-y-6">
        <Card className="overflow-hidden bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d]">
          <CardHeader className="border-b-2 border-black dark:border-zinc-800 bg-[#FFFDF5] dark:bg-zinc-950 p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 font-clash font-black uppercase text-lg text-black dark:text-white">
                  <Cpu className="h-5 w-5 text-black dark:text-white stroke-[2.5]" />
                  AI PROVIDER SETTINGS ★
                </CardTitle>
                <CardDescription className="mt-1 text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  Configure which AI engine powers your interactive portfolio assistant.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={aiEnabled ? "bg-[#b5ff6d] text-black border-2 border-black font-mono font-black text-xs uppercase shadow-[1px_1px_0px_0px_#000]" : "bg-zinc-200 text-black border-2 border-black font-mono font-black text-xs uppercase"}>
                  {aiEnabled ? "ENABLED ★" : "DISABLED"}
                </Badge>
                <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            {/* Provider */}
            <div className="space-y-1">
              <Label className="text-xs font-black uppercase text-black dark:text-white">
                PROVIDER ENGINE
              </Label>
              <Select value={provider} onValueChange={handleProviderChange}>
                <SelectTrigger className="h-10 border-2 border-black font-bold text-xs bg-zinc-50 dark:bg-zinc-950 shadow-[2px_2px_0px_0px_#000]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_#000]" position="popper">
                  <SelectItem value="gemini" className="font-bold text-xs uppercase cursor-pointer">Google Gemini</SelectItem>
                  <SelectItem value="openai" className="font-bold text-xs uppercase cursor-pointer">OpenAI</SelectItem>
                  <SelectItem value="groq" className="font-bold text-xs uppercase cursor-pointer">Groq (Free Speed)</SelectItem>
                  <SelectItem value="custom" className="font-bold text-xs uppercase cursor-pointer">Custom Endpoint</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* API Key */}
            <div className="space-y-1">
              <Label className="text-xs font-black uppercase text-black dark:text-white flex items-center gap-1.5">
                <Key className="h-3.5 w-3.5 stroke-[2.5]" />
                API KEY
              </Label>
              <div className="relative">
                <Input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key..."
                  className="h-10 pr-10 border-2 border-black font-mono font-bold text-xs bg-zinc-50 dark:bg-zinc-950"
                />
                <button
                  type="button"
                  onClick={() => setShowKey((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black dark:text-white cursor-pointer"
                >
                  {showKey ? (
                    <EyeOff className="h-4 w-4 stroke-[2.5]" />
                  ) : (
                    <Eye className="h-4 w-4 stroke-[2.5]" />
                  )}
                </button>
              </div>
            </div>

            {/* Model */}
            <div className="space-y-1">
              <Label className="text-xs font-black uppercase text-black dark:text-white flex items-center gap-1.5">
                <Hash className="h-3.5 w-3.5 stroke-[2.5]" />
                MODEL NAME
              </Label>
              <Input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder={preset?.modelPlaceholder ?? "model-name"}
                className="h-10 border-2 border-black font-mono font-bold text-xs bg-zinc-50 dark:bg-zinc-950"
              />
            </div>

            {/* Endpoint */}
            <div className="space-y-1">
              <Label className="text-xs font-black uppercase text-black dark:text-white flex items-center gap-1.5">
                <Link className="h-3.5 w-3.5 stroke-[2.5]" />
                ENDPOINT URL
              </Label>
              <Input
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder={
                  provider === "gemini"
                    ? "Leave empty to use Google default"
                    : "https://api.example.com/v1/chat/completions"
                }
                className="h-10 border-2 border-black font-mono font-bold text-xs bg-zinc-50 dark:bg-zinc-950"
              />
            </div>

            {/* Max Tokens */}
            <div className="space-y-1">
              <Label className="text-xs font-black uppercase text-black dark:text-white flex items-center justify-between">
                <span>MAX TOKENS</span>
                <span className="font-mono font-bold">{maxTokens}</span>
              </Label>
              <Slider
                min={100}
                max={4000}
                step={100}
                value={[maxTokens]}
                onValueChange={([v]) => setMaxTokens(v)}
                className="w-full"
              />
            </div>

            {/* Temperature */}
            <div className="space-y-1">
              <Label className="text-xs font-black uppercase text-black dark:text-white flex items-center justify-between">
                <span>CREATIVITY (TEMPERATURE)</span>
                <span className="font-mono font-bold">{temperature.toFixed(1)}</span>
              </Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={([v]) => setTemperature(v)}
                className="w-full"
              />
            </div>

            <Button
              onClick={handleSaveAiConfig}
              disabled={aiSaving}
              className="w-full bg-[#b5ff6d] text-black hover:bg-[#a2f059] border-2 border-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] cursor-pointer"
            >
              {aiSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  SAVING AI CONFIG...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4 stroke-[2.5]" />
                  SAVE AI PROVIDER CONFIG ★
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ── Chatbot Config ── */}
      <TabsContent value="bot-config" className="space-y-6">
        <Card className="overflow-hidden bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d]">
          <CardHeader className="border-b-2 border-black dark:border-zinc-800 bg-[#FFFDF5] dark:bg-zinc-950 p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 font-clash font-black uppercase text-lg text-black dark:text-white">
                  <Bot className="h-5 w-5 text-black dark:text-white stroke-[2.5]" />
                  CHATBOT BEHAVIOR ★
                </CardTitle>
                <CardDescription className="mt-1 text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  Customize chatbot name, welcome text, and knowledge system prompt.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={botEnabled ? "bg-[#b5ff6d] text-black border-2 border-black font-mono font-black text-xs uppercase shadow-[1px_1px_0px_0px_#000]" : "bg-zinc-200 text-black border-2 border-black font-mono font-black text-xs uppercase"}>
                  {botEnabled ? "LIVE ★" : "HIDDEN"}
                </Badge>
                <Switch checked={botEnabled} onCheckedChange={setBotEnabled} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            {/* Bot Name */}
            <div className="space-y-1">
              <Label className="text-xs font-black uppercase text-black dark:text-white">
                BOT DISPLAY NAME
              </Label>
              <Input
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                placeholder="Ishtiaq's Assistant"
                className="h-10 border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950"
              />
            </div>

            {/* Welcome Message */}
            <div className="space-y-1">
              <Label className="text-xs font-black uppercase text-black dark:text-white">
                WELCOME MESSAGE
              </Label>
              <Input
                value={welcomeMsg}
                onChange={(e) => setWelcomeMsg(e.target.value)}
                placeholder="Hi! Ask me anything about Ishtiaq 👋"
                className="h-10 border-2 border-black font-bold text-sm bg-zinc-50 dark:bg-zinc-950"
              />
            </div>

            {/* System Prompt */}
            <div className="space-y-1">
              <Label className="text-xs font-black uppercase text-black dark:text-white">
                SYSTEM PROMPT (AI KNOWLEDGE)
              </Label>
              <Textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder={`My hourly rate is $25. I am available Monday–Friday...`}
                className="min-h-[180px] border-2 border-black font-mono font-bold text-xs bg-zinc-50 dark:bg-zinc-950 resize-none rounded-xl"
              />
            </div>

            <Button
              onClick={handleSaveBotConfig}
              disabled={botSaving}
              className="w-full bg-[#b5ff6d] text-black hover:bg-[#a2f059] border-2 border-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] cursor-pointer"
            >
              {botSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  SAVING CONFIG...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4 stroke-[2.5]" />
                  SAVE CHATBOT CONFIG ★
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ── Chat Logs ── */}
      <TabsContent value="logs" className="space-y-6">
        <Card className="overflow-hidden bg-white dark:bg-zinc-900 border-3 border-black dark:border-zinc-300 rounded-2xl shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d]">
          <CardHeader className="border-b-2 border-black dark:border-zinc-800 bg-[#FFFDF5] dark:bg-zinc-950 p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 font-clash font-black uppercase text-lg text-black dark:text-white">
                  <Database className="h-5 w-5 text-black dark:text-white stroke-[2.5]" />
                  CHATBOT CONVERSATION LOGS ★
                </CardTitle>
              </div>
              <Badge className="bg-[#00f0ff] text-black border-2 border-black font-mono font-black text-xs uppercase shadow-[1px_1px_0px_0px_#000]">
                {logTotal} LOGS TOTAL
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {logsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-black" />
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-8 font-bold text-xs text-zinc-500">
                NO CHAT LOGS RECORDED YET.
              </div>
            ) : (
              <div className="max-h-[400px] overflow-y-auto space-y-2">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex gap-3 p-3 rounded-xl border-2 border-black bg-zinc-50 dark:bg-zinc-950 text-xs shadow-[2px_2px_0px_0px_#000]"
                  >
                    <div className="shrink-0">
                      <Badge className={log.role === "user" ? "bg-[#00f0ff] text-black border border-black font-mono font-black text-[10px] uppercase" : "bg-[#b5ff6d] text-black border border-black font-mono font-black text-[10px] uppercase"}>
                        {log.role}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-black dark:text-white truncate">
                        {log.message}
                      </p>
                      <p className="text-[10px] font-mono font-bold text-zinc-500 mt-1">
                        {new Date(log.createdAt).toLocaleString()}
                        {log.ipAddress ? ` · ${log.ipAddress}` : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2">
              {confirmClear ? (
                <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-black bg-red-50 dark:bg-red-950/20 shadow-[2px_2px_0px_0px_#000]">
                  <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 stroke-[2.5]" />
                  <p className="text-xs font-black uppercase text-red-600 flex-1">
                    Delete all {logTotal} chat logs permanently?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setConfirmClear(false)}
                      disabled={clearing}
                      className="bg-white text-black border border-black font-black text-xs cursor-pointer"
                    >
                      CANCEL
                    </Button>
                    <Button
                      onClick={handleClearAllLogs}
                      disabled={clearing}
                      className="bg-red-600 text-white border border-black font-black text-xs cursor-pointer"
                    >
                      {clearing ? <Loader2 className="h-4 w-4 animate-spin" /> : "CONFIRM DELETE ★"}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  className="w-full bg-red-500 text-white hover:bg-red-600 border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                  onClick={() => setConfirmClear(true)}
                  disabled={logTotal === 0}
                >
                  <Trash2 className="mr-1 h-4 w-4 stroke-[2.5]" />
                  CLEAR ALL LOGS ★
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
