import { BlockNoteView } from "@blocknote/shadcn";
import { useSelf } from "@liveblocks/react";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import stringToColor from "@/lib/string-to-color";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { EditorProps } from "./editor";

const Blocknote = ({ doc, provider, darkMode }: EditorProps) => {
  const userInfo = useSelf((me) => me.info);

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider, // Your provider instance
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name || "sammy",
        color: stringToColor(userInfo?.name || "chuks@mail.com"),
      },
    },
  });



  return (
    <div className="relative mx-auto max-w-6xl">
      <BlockNoteView
        className="min-h-screen"
        theme={darkMode ? "dark" : "light"}
        editor={editor}
      />
    </div>
  );
};
export default Blocknote;
