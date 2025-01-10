import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/user-store";
import axios from "axios";
import { useRouter } from "next/navigation";

const DefaultKeyBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setBtnText] = useState("Use Default Key");
  const handleIsLoadingTrue = () => setIsLoading(true);
  const handleIsLoadingFalse = () => setIsLoading(false);
  const handleBtnText = (value: string) => setBtnText(value);
  const router = useRouter();
  const setIsDefault = useAuthStore((state) => state.setIsDefault);
  const handleSubmit = async () => {
    handleIsLoadingTrue() // show spinner
    setIsDefault(true); // set the default value to true
    try {
      const response = await axios.post("api/sign-in/api-verify");
      if (response.status === 200) {
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error) {
      handleIsLoadingFalse();
      handleBtnText("Try again");
    }
  };
  return (
    <Button
      onClick={handleSubmit}
      type="button"
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

export default DefaultKeyBtn;
