/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

// import { useAuthStore } from "@/store/user-store";

// // Get the store instance
// const authStore = useAuthStore;

// // Access the current state
// const currentState = authStore.getState();
// console.log("Details:", currentState.details);
// console.log("Is Authenticated:", currentState.isAuthenticated);

// // Update the state
// authStore.setState({ isAuthenticated: true });
// authStore.setState({ details: { email: "test@example.com" } });

import { useKeyStore } from "@/store/api-store";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function run(prompt: string) {
  const value = useKeyStore.getState().key;

  let apiKey: string;

  if (value) {
    apiKey = value;
  } else {
    apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
  }

  console.log("APIKEY",apiKey);

  console.log('Zustand Value', value)
  

  const genAI = new GoogleGenerativeAI(apiKey as string);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    // console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.log(error);
    alert("Error, check your network provider");
    throw new Error("NOT WORKING");
  }
}

export default run;
