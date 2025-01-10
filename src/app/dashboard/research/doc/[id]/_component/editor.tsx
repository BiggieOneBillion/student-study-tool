"use client";
import { useRoom } from "@liveblocks/react";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
// import TranslateDocument from "./translate-document";
// import { Chathura } from "next/font/google";
import Blocknote from "./blocknote";
import TranslateDocument from "./translate-document";
import ChatDocument from "./chat-to-document";
// import ChatDocument from "./chat-to-document";

export type EditorProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
  darkMode: boolean;
};

const Editor = () => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  const style = `hover:text-white ${
    darkMode
      ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
  }`;

  // console.log("ROOMSS---", room);

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);

    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 flex items-center md:justify-end px-2 md:px-0 gap-2">
        {/* TranslateDocument AI */}
        <TranslateDocument doc={doc} />
        {/* ChatDocument AI */}
        <ChatDocument doc={doc} />
        {/* Dark Mode */}
        <Button className={style} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      {/* BlockNote */}
      <Blocknote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
};
export default Editor;
