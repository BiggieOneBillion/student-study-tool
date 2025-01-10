"use client";
import { useGlobal } from "@/hooks/use-global";
import DisplayResponseContainer from "./display-response-container";
import Header from "./header";
import StudyForm from "./study-form";


export default function DashboardView() {
  const context = useGlobal();
  return (
    <main>
      {/* api key check dialog */}
      {/* <section className="fixed z-[10000] left-0 top-0 flex h-screen w-full items-center justify-center bg-black/70">
        <ApiKeyCheck />
      </section> */}
      <Header />
      <section className="grid w-full grid-cols-1 gap-4 xl:grid-cols-2">
        {/* first grid item */}
        <StudyForm />
        {/* second grid item */}
        {context?.responseGenarated &&
          context?.responseGenarated.length > 0 && <DisplayResponseContainer />}
      </section>
    </main>
  );
}
