import { UserTable } from "@/components/modules/dashboard/admin/user/UserTable";
import { adminService } from "@/services/admin.service";
import { sessionService } from "@/services/session.service";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const { data: sessionData } = await sessionService.getSession();
  if (!sessionData?.session) redirect("/login");

  const token = sessionData.session.token;
  const { data: users } = await adminService.getAllUsers(token);

  return (
    <div className="space-y-6 min-h-screen">
      <div>
        <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2">
          ★ USER ACCOUNTS
        </div>
        <h1 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white">
          USER MANAGEMENT
        </h1>
        <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
          Manage all registered users, roles, and administrative access
        </p>
      </div>
      <UserTable
        users={users || []}
        token={token}
      />
    </div>
  );
}
