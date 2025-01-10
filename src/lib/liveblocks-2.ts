import { createClient } from "@liveblocks/client";

// Replace with your actual Liveblocks public API key from https://liveblocks.io/dashboard
export const liveblocksClient = createClient({
  publicApiKey: process.env.LIVEBLOCKS_PRIVATE_KEY || "",
});
