"use client";
import React, { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";
import { v4 } from "uuid";
import { useGlobal } from "../../../hooks/use-global";
import { Loader2, RefreshCcw, SaveIcon } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import SaveToReplaceAlert from "./save-to-replace-alert";
import { useAuthStore } from "@/store/user-store";

type materialType = {
  topic: string | undefined;
  level: string | undefined;
  info: object | undefined;
};

const DisplayResponseContainer = () => {
  const context = useGlobal();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(false);
  const [btnText, setBtnText] = useState("Save study plan");
  const [isOpen, setIsOpen] = useState(false);
  const [material, setMaterial] = useState<materialType>({
    topic: "",
    level: "",
    info: {},
  });

  const details = useAuthStore((state) => state.details);

  const handleSaveStudyPlan = async () => {
    setIsSaving(true);
    setBtnText("Saving...");
    const data = {
      topic: context?.userSelection.topic,
      level: context?.userSelection.level,
      info: context?.responseGenarated,
    };
    setMaterial(data);
    try {
      const result = await axios.post(`/api/study-plan/${details.id}`, data);
      if (result.status === 200) {
        setIsSaving(false);
        setSaveBtnDisabled(true);
        setBtnText("Study plan saved");
        toast.success("Study Material Saved");
      }
    } catch (error) {
      setIsSaving(false);
      // console.error(error);
      if (error instanceof AxiosError) {
        if (error.response?.data.message === "Study plan already exist") {
          setIsOpen(true);
          setBtnText("Already Exist");
          toast.error("Study Syllabus Already Exist")
        } else {
          toast.success("Error Saving Study Material");
          setBtnText("Try Again");
        }
      }
    }
  };

  useEffect(() => {
    if (context?.responseGenarated) {
      if (context.responseGenarated.length > 0) {
        setIsLoading(false);
        setSaveBtnDisabled(false);
        setBtnText("Save study plan");
      }
    }
  }, [context?.responseGenarated]);

  return (
    <section className="px-4y flex w-full flex-col items-start gap-5 bg-white pt-5">
      {isLoading && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center border-b border-gray-200 bg-black/40 dark:border-gray-800">
          <p className="flex items-center gap-2 text-white">
            <Loader2 className="animate-spin" size={16} /> Generating study
            plan...
          </p>
        </div>
      )}
      {isOpen && (
        <SaveToReplaceAlert
          data={material}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <section>
        <h2 className="text font-medium capitalize">Generated Study Plan</h2>
        <p className="text-sm">
          Don&apos;t like this one, Not to worry we can generate another one
        </p>
        <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center">
          <button
            // disabled={context?.}
            onClick={() => {
              setIsLoading(true);
              context?.generateRandomCallResponse();
            }}
            className="flex w-fit items-center gap-2 rounded-md border px-2 py-2 text-left text-xs sm:text-sm"
          >
            <RefreshCcw
              size={16}
              className={`${isLoading && "animate-spin"}`}
            />{" "}
            Generate another study plan
          </button>
          <button
            disabled={saveBtnDisabled}
            onClick={handleSaveStudyPlan}
            className="flex w-fit items-center gap-2 rounded-md border px-2 py-2 text-xs disabled:opacity-50 sm:text-sm"
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" /> {btnText}
              </>
            ) : (
              <>
                <SaveIcon size={16} />
                {btnText}
              </>
            )}
          </button>
        </div>
      </section>
      <div className="md:grid-cols-2y mx-auto grid w-full max-w-4xl flex-1 gap-4 overflow-y-scroll">
        {context?.responseGenarated.map((result) => (
          //   <section className="relative">
          <Disclosure
            as="div"
            className="relative border p-6"
            defaultOpen={false}
            key={v4()}
          >
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-sm/6 font-medium text-black group-data-[hover]:text-black/80">
                {result.Courses}
              </span>
              <FaChevronDown className="size-5 fill-black/60 group-data-[open]:rotate-180 group-data-[hover]:fill-black/50" />
            </DisclosureButton>
            <DisclosurePanel className="absolute left-0 top-[80%] z-50 ml-3 w-full border bg-white px-5 text-sm/5 text-black/50">
              <section className="space-y-5 px-2 py-5">
                <div>
                  <h3 className="text-smfont-medium text-black">
                    Things to learn
                  </h3>
                  <p className="text-xs text-slate-500 underline">
                    Click on each of the lessons to take them.
                  </p>
                </div>
                <ul className="list-outside list-disc space-y-3">
                  {result.Learn &&
                    result.Learn.map((lesson) => (
                      <li key={v4()}>
                        <button className="w-full rounded-md border px-2 py-1 text-left text-sm">
                          {lesson}
                        </button>
                      </li>
                    ))}
                </ul>
              </section>
            </DisclosurePanel>
          </Disclosure>
          //   </section>
        ))}
      </div>
    </section>
  );
};

export default DisplayResponseContainer;
