import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { Loader2 } from "lucide-react";

type SaveToReplaceAlertProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: object;
};

const SaveToReplaceAlert = ({
  isOpen,
  setIsOpen,
  data,
}: SaveToReplaceAlertProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [btnText, setBtnText] = useState("Continue");
  const handleSaveNew = async () => {
    setBtnText("Saving...");
    try {
      const result = await axios.put(
        `/api/study-plan/6767b162a427174812966796`,
        data,
      );
      if (result.status === 200) {
        setBtnText("Study plan saved");
        setIsOpen(false);
        setIsSaving(false);
      }
    } catch (error) {
      setIsSaving(false);
      setBtnText("Try Again");
    }
  };

  useEffect(() => {
    if (btnText === "Study plan saved") {
      setTimeout(() => {
        setBtnText("Continue");
      }, 2000);
    }
  }, []);
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            A study plan already exists. Are you sure you want to replace it?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will replace your previous study
            with the new one. Please think carefully before proceeding.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="flex items-center gap-2"
            onClick={handleSaveNew}
          >
            {isSaving && <Loader2 className="animate-spin" size={16} />}
            {btnText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SaveToReplaceAlert;
