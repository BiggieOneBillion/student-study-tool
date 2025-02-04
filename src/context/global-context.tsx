"use client";
import run from "@/lib/gemini";
import { learningTemplate, randomLearningTemplate } from "@/lib/prompts";
import generateContent from "@/lib/test-key-2";
import { useKeyStore } from "@/store/api-store";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {toast} from "sonner"

type response = {
  id: number;
  Courses: string;
  Learn: string[];
};

type globalType = {
  responseGenarated: response[];
  callMoreResearch: () => Promise<void>; // to further explain concepts
  callresponse: (topic: string, level: string) => Promise<void>; // to generate learning path
  generateRandomCallResponse: () => Promise<void>; // to generate random learning path
  selectedLabel: string; // selected sub topic for further research
  setSelectedLabel: Dispatch<SetStateAction<string>>; // set selected sub topic for further research
  setUserSelection: Dispatch<
    SetStateAction<{
      topic: string;
      level: string;
    }>
  >;
  userSelection: {
    topic: string;
    level: string;
  };
  newResearchResponse: string; // holds the sub-topic research response in details.
  isExplainingTopic: boolean;
  isLoadingExplanation: boolean;
  setIsLoadingExplaination: Dispatch<SetStateAction<boolean>>;
  handleGenerateQuestion: () => void;
  questionOutput: {
    question: string;
    options: string[];
    answer: string;
  }[];
  questionModal: boolean;
  setQuestionModal: Dispatch<SetStateAction<boolean>>;
  currentInfoIndex: number;
  setCurrentInfoIndex: Dispatch<SetStateAction<number>>;
  currentStudyPlan: object;
  setCurrentStudyPlan: Dispatch<SetStateAction<object>>;
  isApiKeyWorking: boolean;
  setIsApiKeyWorking: Dispatch<SetStateAction<boolean>>;
};

export const GlobalContext = createContext<globalType | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [userSelection, setUserSelection] = useState({
    topic: "",
    level: "",
  });

  const [isApiKeyWorking, setIsApiKeyWorking] = useState<boolean>(true);

  const [responseGenarated, setResponseGenarated] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  // const [newresharch, setnewreshach] = useState("");
  const [newResearchResponse, setNewResearchResponse] = useState(""); // holds the sub-topic research response in details.
  const [isExplainingTopic, setIsExplainingTopic] = useState(false);
  const [isLoadingExplanation, setIsLoadingExplaination] = useState(true);
  const [questionOutput, setQuestion] = useState([]);
  const [questionModal, setQuestionModal] = useState(false);
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);
  const [currentStudyPlan, setCurrentStudyPlan] = useState({});

  //   const [islabelempty, setIsLableEmpty] = useState(false);
  //   const [questionOutput, setQuestion] = useState([]);
  //   const [questionModal, setQuestionModal] = useState(false);

  //   const handleGenerateQuestion = async () => {
  //     const response = await run(promptOutPut);

  //     let newResponse = response.replaceAll(/```/g, "");
  //     const newResponse2 = newResponse.replaceAll("json", "");

  //     const FormatedResponse = JSON.parse(newResponse2);

  //     setQuestion(FormatedResponse);
  //     console.log(typeof FormatedResponse);
  //   };

  const generateRandomCallResponse = async () => {
    const learning = randomLearningTemplate(
      userSelection.topic,
      userSelection.level,
    );
    const value = useKeyStore.getState().key
    const apiTest = await generateContent(value || process.env.NEXT_PUBLIC_GEMINI_API_KEY!);


    if (!apiTest.status) {
      setIsApiKeyWorking(false)
      return
    }

    const responseOutput = await run(learning);

    if (responseOutput) {
      const newResponse = responseOutput.replaceAll(/`/g, "");
      const newResponse2 = newResponse.replaceAll("json", "");

      const FormatedResponse = JSON.parse(newResponse2);
      setResponseGenarated(FormatedResponse);
    } else {
      toast.error("Something Went Wrong, Network Error");
    }

    // setGeneratedResult(FormatedResponse); // update zustand store.
    // setSelectedLabel("");
  };

  const callresponse = async (topic: string, level: string) => {
    const learning = learningTemplate(topic, level);
    const value = useKeyStore.getState().key
    const apiTest = await generateContent(value || process.env.NEXT_PUBLIC_GEMINI_API_KEY!);


    if (!apiTest.status) {
      setIsApiKeyWorking(false)
      return
    }
    const responseOutput = await run(learning);

    // console.log(responseOutput);

    if (!responseOutput) {
      toast.error("Network Issue, No response");
    } else {
      const newResponse = responseOutput.replaceAll(/`/g, "");
      const newResponse2 = newResponse.replaceAll("json", "");

      const FormatedResponse = JSON.parse(newResponse2);
      setResponseGenarated(FormatedResponse);
    }

    // setGeneratedResult(FormatedResponse); // update zustand store.
    // setSelectedLabel("");
  };

  //   const sanitizeResponse = (response) => {
  //     return response
  //       .replace(/[`"'~**]/g, "") // Remove unwanted characters
  //       .split("\n") // Split response into lines
  //       .map((line, index) => {
  //         if (line.startsWith("##")) {
  //           return {
  //             type: "heading",
  //             text: line.replace(/##/g, "").trim(),
  //             key: index,
  //           };
  //         } else if (line.endsWith(":")) {
  //           return {
  //             type: "subheading",
  //             text: line.replace(/-/g, ""),
  //             key: index,
  //           };
  //         } else if (line.startsWith("**")) {
  //           // Check for lines with **
  //           return {
  //             type: "boldText",
  //             text: line.replace(/\*\*/g, "").trim(),
  //             key: index,
  //           };
  //         }
  //         return { type: "text", text: line.trim(), key: index };
  //       });
  //   };

  const callMoreResearch = async () => {
    setIsExplainingTopic(true);
    if (selectedLabel) {
      // const newResearch = `Explain in detail how ${selectedLabel} works. Provide a comprehensive explanation along with clear examples. Ensure that the result is well-structured, with appropriate spacing for readability. Please return the result in a properly formatted Markdown (MDX) structure, including appropriate headings, code blocks, and lists where necessary, and make sure to leave sufficient line breaks between sections for easy reading.`;

      const newResearch = `Provide a detailed explanation of how ${selectedLabel} functions. Your response should include:
Comprehensive Overview: Start with a thorough introduction to the concept, covering its purpose and significance.
Clear Examples: Include relevant examples that illustrate how ${selectedLabel} operates in practical scenarios.
Structured Format: Organize your explanation using appropriate headings and subheadings for easy navigation.
Markdown (MDX) Formatting: Use Markdown formatting to enhance readability, including:
Code blocks for any technical examples or code snippets
Bullet points or numbered lists where applicable
Spacing for Readability: Ensure there are ample line breaks between sections to facilitate easy reading.
Please deliver the final result in a well-structured Markdown format`;

      try {
        const value = useKeyStore.getState().key
        const apiTest = await generateContent(value || process.env.NEXT_PUBLIC_GEMINI_API_KEY!);


        if (!apiTest.status) {
          setIsApiKeyWorking(false)
          return
        }
        const callMoreResearchOutput = await run(newResearch);
        // const newResponse = sanitizeResponse(callMoreResearchOutput);
        if (!callMoreResearchOutput) {
          toast.error("Explanation not avaliable, Try again");
        } else {
          setNewResearchResponse(callMoreResearchOutput);
          setIsLoadingExplaination(false);
        }
      } catch (error) {
        console.error("Error in callMoreResearch:", error);
      }
    } else {
      // console.warn("Selected label is empty, skipping research call.");
    }
  };

  const promptOutPut = `Generate  10 level questions for this topic ${selectedLabel}. Provide multiple-choice answer options for each question and clearly mark the correct answer. Return the response as an array of JSON objects with the following format for each question:

  [
    {
      "question": "Your question here",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "answer": "Correct answer here"
    },
    {
      "question": "Your question here",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "answer": "Correct answer here"
    },
    ...
  ]
  
  Only return valid JSON, without any additional text or formatting.`;

  const handleGenerateQuestion = async () => {
    const value = useKeyStore.getState().key
    const apiTest = await generateContent(value || process.env.NEXT_PUBLIC_GEMINI_API_KEY!);


    if (!apiTest.status) {
      setIsApiKeyWorking(false)
      return
    }

    const response = await run(promptOutPut);

    if (response) {
      const newResponse = response.replaceAll(/```/g, "");
      const newResponse2 = newResponse.replaceAll("json", "");

      const FormatedResponse = JSON.parse(newResponse2);
      //  const FormatedResponseoutput = FormatedResponse.replace(/```/g, "").replace(/json/g, "").trim();

      setQuestion(FormatedResponse);
    } else {
      toast.error("Quiz data error, try again later");
    }

    // console.log(typeof FormatedResponse);
  };

  useEffect(() => {
    if (selectedLabel) callMoreResearch();
  }, [selectedLabel]);

  return (
    <GlobalContext.Provider
      value={{
        userSelection,
        responseGenarated,
        callMoreResearch, // to further explain concepts
        callresponse, // to generate learning path
        selectedLabel, // selected sub topic for further research
        setSelectedLabel, // set selected sub topic for further research
        setUserSelection, // set user selection of topic and level
        generateRandomCallResponse,
        newResearchResponse, // holds the sub-topic research response in details.
        isExplainingTopic,
        isLoadingExplanation,
        setIsLoadingExplaination,
        handleGenerateQuestion,
        questionModal,
        questionOutput,
        setQuestionModal,
        currentInfoIndex,
        setCurrentInfoIndex,
        currentStudyPlan,
        setCurrentStudyPlan,
        isApiKeyWorking,
        setIsApiKeyWorking,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
