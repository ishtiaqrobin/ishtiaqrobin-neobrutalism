import { sessionService } from "@/services/session.service";
import { ReviewManager } from "@/components/modules/dashboard/user/ReviewManager";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function UserReviewPage() {
    const { data: sessionData } = await sessionService.getSession();

    if (!sessionData?.session) {
        redirect("/login");
    }

    const userToken = sessionData.session.token;

    return (
        <div className="space-y-6 min-h-screen pb-20">
            <div>
                <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2">
                    ★ REVIEW & TESTIMONIAL
                </div>
                <h1 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white">
                    MANAGE YOUR REVIEW
                </h1>
                <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
                    Share your experience and feedback to be displayed on the portfolio homepage.
                </p>
            </div>

            <ReviewManager token={userToken} />
        </div>
    );
}
