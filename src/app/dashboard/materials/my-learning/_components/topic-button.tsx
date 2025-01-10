import { useGlobal } from "@/hooks/use-global";
import { Lock } from "lucide-react";
import React from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";

const TopicButton = ({
  lesson,
  quizStatus,
  infoIndex,
  studyplan,
}: {
  lesson: string;
  quizStatus: boolean;
  infoIndex: number;
  studyplan: object;
}) => {
  const context = useGlobal();
  const size = useWindowSize();
  const router = useRouter();

  const handleBtnClick = (topic: string) => {
    context?.setSelectedLabel(topic);
    context?.callMoreResearch();
    context?.setIsLoadingExplaination(true);
    context?.setCurrentInfoIndex(infoIndex);
    context?.setCurrentStudyPlan(studyplan);
    size.width! <= 760 && router.push("explanation"); //! this is only to run when on mobile screen only
  };
  return (
    <li>
      <button
        onClick={() => handleBtnClick(lesson)}
        className={`flex w-full items-center gap-1 rounded-md border px-2 py-1 text-left text-sm ${!quizStatus && "pointer-events-none"}`}
      >
        {!quizStatus && <Lock size={14} />}
        {lesson}
      </button>
    </li>
  );
};

export default TopicButton;
