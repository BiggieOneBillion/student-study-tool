"use client";

import { useAuthStore } from "@/store/user-store";
import { LiveblocksProvider } from "@liveblocks/react/suspense";

function LiveBlockProvider({ children }: { children: React.ReactNode }) {
  const { details } = useAuthStore();
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not set");
  }
  return (
    <LiveblocksProvider
      throttle={16}
      //   publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY}
      // authEndpoint={"/auth-endpoint"/* TODO: replace with actual auth endpoint */}
      authEndpoint={async (room) => {
        // Passing custom headers and body to your endpoint
        const headers = {
          "Content-Type": "application/json",
        };

        const body = JSON.stringify({
          userId: details.id,
          email: details.email,
          username: details.username,
          room,
        });

        const response = await fetch("/api/liveblocks-auth", {
          method: "POST",
          headers,
          body,
        });

        return await response.json();
      }}
    >
      {children}
    </LiveblocksProvider>
  );
}

export default LiveBlockProvider;
