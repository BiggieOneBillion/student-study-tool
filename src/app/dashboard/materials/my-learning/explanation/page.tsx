"use client";

import { ChevronLeft } from "lucide-react";
import TopicPortalView from "../_components/topic-portal-view";
import { useRouter } from "next/navigation";
import ChatToStudyDocument from "../_components/chat-to-study-document";
import { useGlobal } from "@/hooks/use-global";

export default function ExplanantionPage() {
  const router = useRouter();
  const context = useGlobal();
  const handleBack = () => {
    router.back();
  };
  return (
    <main className="space-y-4">
      <button className="border" onClick={handleBack}>
        <ChevronLeft />
      </button>
      <section className="max-h-600px col-span-2 flex w-full flex-col gap-4 rounded-sm border bg-gray-50 p-5">
        <header className="sticky left-0 top-0 flex flex-col gap-4">
          <section>
            <span className="text font-medium">Learning Area</span>
            <span className="inline-block rounded-sm border bg-slate-100 px-1 py-1 text-sm">
              When you are done. Take the quiz at the end of this lesson to
              unlock the next
            </span>
          </section>
          <section>
            {context?.newResearchResponse && (
              <ChatToStudyDocument doc={context?.newResearchResponse} />
            )}
          </section>
        </header>
        {/* the actual content */}
        <TopicPortalView />
      </section>
    </main>
  );
}
