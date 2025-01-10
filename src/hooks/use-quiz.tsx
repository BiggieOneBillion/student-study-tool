import { useState } from "react";
import { useGlobal } from "./use-global";
import axios from "axios";
import { useAuthStore } from "@/store/user-store";
import { toast } from "sonner";

const useQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [displayResponse, setDisplayResponse] = useState("");
  const [alertText, setAlertText] = useState("");
  const [quizEndText, setQuizEndText] = useState("");

  const details = useAuthStore((state) => state.details);

  const context = useGlobal();

  const questionOutput = context?.questionOutput;

  const questionModal = context?.questionModal;


  const currentQuestion:
    | {
        question: string;
        options: string[];
        answer: string;
      }
    | undefined = questionOutput && questionOutput[currentQuestionIndex];

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleMoveToNext = async () => {
    try {
      await axios.put(`/api/unlock/${details.id}`, {
        quizTitle: context?.selectedLabel,
        infoIndex: context?.currentInfoIndex,
        studyPlan: context?.currentStudyPlan,
      });
      toast.success("Done with quiz, moved to the next level");
    } catch (error) {
      // console.log(error);
      toast.error("Error Occured, try again");
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion?.answer) {
      setDisplayResponse("Correct answer!");
      setTimeout(async () => {
        if (context?.questionOutput) {
          if (currentQuestionIndex < context?.questionOutput.length - 1) {
            // Increment question index for the next question
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setDisplayResponse(""); // Clear feedback message
          } else {
            // Final question completed
            setAlertText("Congratulations! You've completed the test.");
            await handleMoveToNext();
            setQuizEndText("Consider moving to the next level!");

            // setTimeout(() => {
            //   router.back();
            // }, 2000);
          }
        }
        setSelectedOption(""); // Reset selected option
      }, 1000);
    } else {
      setDisplayResponse("Incorrect answer. Try again.");
    }
  };

  return {
    currentQuestionIndex,
    currentQuestion,
    questionOutput,
    questionModal,
    displayResponse,
    alertText,
    quizEndText,
    selectedOption,
    handleNextQuestion,
    handleOptionChange,
  };
};

export default useQuiz;
