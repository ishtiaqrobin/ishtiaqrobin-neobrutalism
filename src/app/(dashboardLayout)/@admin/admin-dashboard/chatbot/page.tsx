import { ChatbotManager } from "@/components/modules/dashboard/admin/chatbot/ChatbotManager";
import { chatbotService } from "@/services/chatbot.service";
import { sessionService } from "@/services/session.service";

export default async function AdminChatbotPage() {
  const session = await sessionService.getSession();
  const token = session.data?.session.token;

  const [aiConfigRes, chatbotConfigRes] = await Promise.all([
    chatbotService.getAiProviderConfig(token),
    chatbotService.getChatbotConfig(token),
  ]);

  return (
    <div className="min-h-screen space-y-8">
      <div>
        <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2">
          ★ AI ASSISTANT CONTROL
        </div>
        <h1 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white">
          CHATBOT MANAGEMENT
        </h1>
        <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
          Configure AI provider credentials, prompt behavior, and chat logs
        </p>
      </div>

      <ChatbotManager
        aiConfig={aiConfigRes.data}
        chatbotConfig={chatbotConfigRes.data}
        token={token}
      />
    </div>
  );
}
