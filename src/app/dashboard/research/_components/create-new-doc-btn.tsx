"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuthStore } from "@/store/user-store";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
// import { createNewDocument } from "@/actions/actions";

const CreateNewDocumentBtn = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();
  const details = useAuthStore((state) => state.details);

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      try {
        const res = await axios.post("/api/docs", { userId: details.id });
        if (res.status === 200) {
          queryClient.invalidateQueries({
            queryKey: ["owners-document"],
          });
          toast.success("Document created successfully");
          // console.log(res.data);
          router.push(`/dashboard/research/doc/${res.data._id}`);
        }
      } catch (error) {
        // console.log(error);
        toast.error("Failed to create document");
      }
    });
  };

  return (
    <Button
      type="button"
      onClick={handleCreateNewDocument}
      disabled={isPending}
      className="w-full text-sm bg-white text-black border hover:border-black/70 hover:bg-white"
    >
      {isPending ? "Creating..." : "Create New Document"}
    </Button>
  );
};
export default CreateNewDocumentBtn;
