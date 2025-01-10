import React, { useEffect, useState } from "react";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import "./learning-modal.css";
import { useGlobal } from "@/hooks/use-global";
import { LoaderCircle } from "lucide-react";
import Quiz from "./quiz/quiz";
import { toast } from "sonner";

const TopicPortalView = () => {
  const [text, setText] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);

  const context = useGlobal();

  const handleQuestion = (): void => {
    context?.handleGenerateQuestion();
    context?.setQuestionModal(true);
    setShowQuiz(true);
  };

  useEffect(() => {
    if (context?.newResearchResponse) {
      const fn = async () => {
        const file = await unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkRehype)
          .use(rehypeStringify)
          .process(context?.newResearchResponse);
        return file;
      };

      fn()
        .then((file) => setText(String(file)))
        .catch(() =>
          toast.error("Failed to format markdown, please refresh the page."),
        );
    }
  }, [context?.newResearchResponse]);

  return (
    <>
      {context?.isExplainingTopic && (
        <div className="removescrollbar sm:w-[40vw]y h-[100vh] w-full overflow-scroll bg-white py-5 md:px-5">
          {text && !context?.isLoadingExplanation ? (
            <div className="text-black">
              {/* <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-4 flex h-[20px] items-center justify-center bg-red-100 p-2 py-3 text-red-600"
              >
                <IoClose /> close
              </button> */}
              <div className="generated-response">
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </div>
              <div className="mt-5">
                <p className="mb-1 text-wrap text-center text-xs underline">
                  Feeling confident about your newly acquired knowledge? Then
                  take a quiz.
                </p>
                <button
                  onClick={handleQuestion}
                  className="w-full rounded-md bg-blue-600 py-2 text-[13px] text-white"
                >
                  Take A Quiz
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[rgba(0,0,0,0.9)]y flex h-[100vh] items-center justify-center gap-1">
              <LoaderCircle size={16} color="black" className="animate-spin" />{" "}
              Loading explanation....
            </div>
          )}
          {showQuiz && <Quiz />}
        </div>
      )}
    </>
  );
};

export default TopicPortalView;
