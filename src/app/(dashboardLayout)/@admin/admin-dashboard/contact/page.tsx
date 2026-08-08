import { contactService } from "@/services/contact.service";

import { ContactManager } from "@/components/modules/dashboard/admin/contact/ContactManager";
import { sessionService } from "@/services/session.service";

export default async function AdminContactsPage() {
  const session = await sessionService.getSession();
  const token = session.data?.session.token;

  const [contactsRes, statsRes] = await Promise.all([
    contactService.getAllContacts(token),
    contactService.getContactStats(token),
  ]);

  return (
    <div className="min-h-screen space-y-6">
      <div>
        <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2">
          ★ MESSAGES & INQUIRIES
        </div>
        <h1 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white">
          CONTACT MANAGEMENT
        </h1>
        <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
          Manage and respond to messages submitted by portfolio visitors
        </p>
      </div>

      <ContactManager
        initialContacts={contactsRes.data ?? []}
        initialStats={statsRes.data ?? []}
        token={token}
      />
    </div>
  );
}
