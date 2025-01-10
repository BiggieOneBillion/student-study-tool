"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useGlobal } from "@/hooks/use-global";
import CheckApiKey from "../sign-in/_component/check-api-key";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const context = useGlobal();
  return (
    <div suppressHydrationWarning={true}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="z-[50] flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 lg:sticky lg:top-0">
            <div className="flex h-16 w-full items-center gap-2 border-b border-gray-200 px-4 dark:border-gray-800 lg:bg-white">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="block">
                    <BreadcrumbLink href="/dashboard" className="capitalize">
                      Creating your study ideal plan
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <main className="flex w-screen flex-1 flex-col gap-4 overflow-scroll p-4 pt-5 md:w-full">
            {/* <ProtectRouteDashboard> */}
            {children}
            {/* </ProtectRouteDashboard> */}
          </main>
          {!context?.isApiKeyWorking && <CheckApiKey />}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
