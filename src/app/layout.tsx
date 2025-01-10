import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/providers/providers";
import { Toaster } from "sonner";
import NetworkStatus from "@/components/network-status";

const lato = Lato({
  weight: ["100", "300", "400", "700"],
  preload: true,
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Study-Tool",
  description: "An AI study tool, uses gemini ai under the hood ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn("relative h-full font-sans antialiased", lato.className)}
      >
        <NetworkStatus />
        <Providers>
          <main>{children}</main>
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
