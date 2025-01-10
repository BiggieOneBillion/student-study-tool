"use client";

import { deleteDocument } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/store/user-store";
import { DialogClose } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const DeleteDocument = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const { details } = useAuthStore();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    const roomId = pathname.split("/").pop();

    if (!roomId) return;
    startTransition(async () => {
      try {
        const res = await deleteDocument(roomId, details.id);
        if (!res) throw new Error("Failed to delete document");
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["owners-document"] });
        // router.replace("/");
        toast.success("Document Deleted Successfully");
      } catch (error) {
        toast.error("Failed to delete document!");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"destructive"} className="md:inline hidden">
        <DialogTrigger>Delete</DialogTrigger>
      </Button>
      <Button asChild variant={"outline"} className="md:hidden border-red-400">
        <DialogTrigger>
          <TrashIcon color="red"/>
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant={"secondary"}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteDocument;
