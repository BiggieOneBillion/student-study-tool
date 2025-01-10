"use client";
import { updateDocumentTitle } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useOwner from "@/hooks/use-owner";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import DeleteDocument from "./delete-document";
import { useGetDocument } from "@/hooks/use-get-document";
import { EditIcon, Loader2 } from "lucide-react";

const loadingText = "loading info....";

export default function EditTitleForm() {
  const [isUpdating, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const param = usePathname();
  const queryClient = useQueryClient();

  const docId = param.split("/").pop() || "";

  const isOwner = useOwner(docId);

  const { isLoading, data } = useGetDocument(docId);

  const handleUpdateTitle = (e: FormEvent) => {
    e.preventDefault();
    if (!input || input === loadingText || input === data.data?.title) {
      toast.error("Title cannot be empty or the same as the current title");
      return;
    }
    startTransition(async () => {
      // await updateDocumentTitle(input);
      await updateDocumentTitle(docId, input);
      queryClient.invalidateQueries({ queryKey: ["document", docId] });
      queryClient.invalidateQueries({ queryKey: ["owners-document"] });
      setInput("");
    });
  };

  const canEdit = !input || input === loadingText || input === data.data?.title

  useEffect(() => {
    data && setInput(data.data?.title || "");
    isLoading && setInput(loadingText);
  }, [data, isLoading]);

  return (
    <form
      onSubmit={handleUpdateTitle}
      className="flex flex-1 flex-wrapy items-end gap-2 px-2 md:items-center md:gap-0 md:space-x-2 md:px-0"
    >
      <Input value={input} onChange={(e) => setInput(e.target.value)} />
      <Button
        className="hidden md:inline"
        type="submit"
        disabled={isUpdating || isLoading}
      >
        {isUpdating ? "Updating..." : "Update"}
      </Button>
      <Button
        variant={'outline'}
        className="md:hidden disabled:bg-slate-200"
        type="submit"
        disabled={isUpdating || isLoading || canEdit}
      >
        {isUpdating ? <Loader2 className="animate-spin"/> : <EditIcon />}
      </Button>
      {isOwner && (
        <>
          {/* <InviteUser /> */}
          <DeleteDocument />
        </>
      )}
    </form>
  );
}
