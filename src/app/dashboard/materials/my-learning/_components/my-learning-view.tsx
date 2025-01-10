"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Header from "./Header";
import TopInfo from "./top-info";
import MyLearningTopics from "./my-learning-topics";
import TopicPortalView from "./topic-portal-view";
import { useAuthStore } from "@/store/user-store";
import ChatToStudyDocument from "./chat-to-study-document";
import { useGlobal } from "@/hooks/use-global";

type myLearningViewType = {
  id: string;
};

const MyLearningView = ({ id }: myLearningViewType) => {
  const details = useAuthStore((state) => state.details);

  const context = useGlobal();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["material"],
    queryFn: async () => {
      const response = await axios.get(`/api/study-plan/${details.id}`);
      return response.data;
    },
    refetchInterval: 100000,
  });

  if (isLoading) {
    return <div className="text-black">Loading...</div>;
  }

  if (isError) {
    return <div className="text-black">Error fetching data</div>;
  }

  // data && console.log(data);

  const result =
    data && data.length > 0
      ? data.filter((datum: object, index: number) => index === Number(id))
      : [];



  return (
    <main className="space-y-10">
      <Header />
      <section className="grid gap-5 xl:grid-cols-3">
        <div className="space-y-3">
          <TopInfo topic={result[0].topic} level={result[0].level} />
          <MyLearningTopics data={result} />
          {/* {MemorizeChild} */}
        </div>
        <section className="max-h-600px col-span-2 hidden w-full flex-col gap-4 rounded-sm border bg-gray-50 p-5 xl:flex">
          <header className="sticky left-0 top-0 flex justify-between items-center gap-1">
            <section>
              <span className="text font-medium">Learning Area</span> -
              <span className="inline-block rounded-sm border bg-slate-100 px-1 py-1 text-sm">
                Click on any of the sub-topics to see the full explanantion to
                the lesson
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
      </section>
    </main>
  );
};

export default MyLearningView;
