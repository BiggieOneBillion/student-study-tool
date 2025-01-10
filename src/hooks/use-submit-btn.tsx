import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const useSubmitBtn = ({ initialText = "Submit" }: { initialText: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setBtnText] = useState(initialText);
  const handleIsLoadingTrue = () => setIsLoading(true);
  const handleIsLoadingFalse = () => setIsLoading(false);
  const handleBtnText = (value: string) => setBtnText(value);

  const SubmitBtn = () => {
    return (
      <Button
        type="submit"
        className="flex w-full items-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> {btnText}
          </>
        ) : (
          btnText
        )}
      </Button>
    );
  };
  return {
    handleIsLoadingFalse,
    handleIsLoadingTrue,
    handleBtnText,
    SubmitBtn,
  };
};

export default useSubmitBtn;
