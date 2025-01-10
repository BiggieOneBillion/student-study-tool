import { ReactNode } from "react";
import LiveBlockProvider from "@/providers/liveblock-provider";
import SideBar from "./_components/sidebar";

const ResearchLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-full w-full items-start">
      <SideBar />
      {/* main content--document area */}
      <LiveBlockProvider>
        <main className="h-full flex-1 border">{children}</main>
      </LiveBlockProvider>
    </div>
  );
};
export default ResearchLayout;
