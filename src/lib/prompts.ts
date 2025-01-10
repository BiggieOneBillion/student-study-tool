export function learningTemplate(topic: string, level: string) {
  return `Generate detailed learning paths for a career ${topic} specified by the user with a difficulty level of ${level}. Provide specific steps and explanations to cover each area required to succeed, structured as valid JSON without any additional text or formatting. The structure should look like this:

[{
"id":1,
  "Courses": "title",
  "Learn": ["learn 1 in very few words not higher than 15 words", "learn 2 in very few words not higher than 15 words"],
}]

Only return valid JSON without backticks, additional text, or formatting.`;
}

export function promptOutPut(topic: string, level: string) {
  return `Generate  10 level questions for this topic ${topic} with a hardness level of ${level}. Provide multiple-choice answer options for each question and clearly mark the correct answer. Return the response as an array of JSON objects with the following format for each question:

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
}

export function randomLearningTemplate(topic: string, level: string) {
  const learningTemplatesArr = [
    `Create structured learning paths for ${topic}. Break into daily skill-building exercises. Design progress validation system. Include enjoyment-to-effort ratio. Generate skill demonstration opportunities.
     My target level: ${level}.The structure should look like this:

[{
"id":1,
  "Courses": "title",
  "Learn": ["learn 1 in very few words not higher than 15 words", "learn 2 in very few words not higher than 15 words"],
}]

Only return valid JSON without backticks, additional text, or formatting`,
    `Design a 21-day rapid learning system for ${topic}. Structure into morning theory, afternoon practice, and evening review. Create dopamine-triggering rewards for each milestone. Include focus-state triggers and retention measurements.
My available time: all day and target level is ${level}.The structure should look like this:

[{
"id":1,
  "Courses": "title",
  "Learn": ["learn 1 in very few words not higher than 15 words", "learn 2 in very few words not higher than 15 words"],
}]

Only return valid JSON without backticks, additional text, or formatting`,
  ];
  const randomNumber = Math.floor(Math.random() * learningTemplatesArr.length);

  // console.log("RandomNumber",randomNumber);

  return learningTemplatesArr[randomNumber];
}
