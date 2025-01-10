"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BotIcon, MessageCircleCode } from "lucide-react";
import { FormEvent, useState, useTransition } from "react";
import Markdown from "react-markdown";
import { toast } from "sonner";

const ChatToStudyDocument = ({ doc }: { doc: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");

  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault();
    setQuestion(input);
    startTransition(async () => {
      // const documentData = doc.store;
      // const documentData = doc.getText("document-store").toJSON();
      //   const documentData = doc.get('document-store').toJSON();
      // console.log("Document Data", documentData);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/translateGemini`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentData: doc,
            question: input,
          }),
        },
      );

      if (res.ok) {
        const message = await res.json();
        setInput("");
        // console.log(message)
        setSummary(message.answer);
        toast.success("Document Translated Successfully");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"outline"}>
        <DialogTrigger>
          <MessageCircleCode className="mr-2" />
          Chat Document
        </DialogTrigger>
      </Button>
      <section className="px-4">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat To Document</DialogTitle>
            <DialogDescription>
              Ask a question and chat to the document with AI
            </DialogDescription>
            {question && (
              <p className="mt-5 text-sm text-gray-500">Question: {question}</p>
            )}
          </DialogHeader>

          {summary && (
            <div className="flex max-h-96 flex-col items-start gap-2 overflow-y-scroll bg-gray-100 p-5">
              <div className="flex">
                <BotIcon className="w-10 flex-shrink-0" />
                <p>AI - {isPending ? "is thinking..." : "Says:"}</p>
              </div>
              <p>{isPending ? "Thinking" : <Markdown>{summary}</Markdown>}</p>
            </div>
          )}

          <form className="flex gap-2" onSubmit={handleAskQuestion}>
            <Input
              type="text"
              placeholder="i.e what is this about?"
              className="w-full"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" disabled={!input || isPending}>
              {isPending ? "Asking..." : "Ask"}
            </Button>
          </form>
        </DialogContent>
      </section>
    </Dialog>
  );
};
export default ChatToStudyDocument;
