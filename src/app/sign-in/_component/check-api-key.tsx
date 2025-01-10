import ApiKeyCheck from "@/components/api-key-check";
import { CircleAlert } from "lucide-react";

export default function CheckApiKey() {
  return (
    <main className="flex h-screen fixed top-0 left-0 z-[1000] w-full flex-col items-center px-3 pt-20 gap-10 bg-black/60">
      <section className="flexy items-start gap-2 rounded-md bg-blue-100 px-3 py-3 text-blue-900 hidden">
        <span className="inline-block mt-1">
          <CircleAlert size={16} />
        </span>
        <div>
          <p className="text-sm">
            You can either enter your own api key from{" "}
            <span className="font-semibold uppercase">gemini ai</span>
          </p>
          <p className="text-sm">
            If you don&apos;t have you can click the link to get a key{" "}
            <a href="https://aistudio.google.com/apikey" target="_blank" className="underline">link</a>{" "}
          </p>
          <p className="text-sm">
            If not you can use the default key but you are limited to 5 prompts
            per day
          </p>
        </div>
      </section>
      <ApiKeyCheck />
    </main>
  );
}
