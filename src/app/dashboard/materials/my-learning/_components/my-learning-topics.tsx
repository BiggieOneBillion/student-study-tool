import React, { memo } from "react";
import TopicsDisplay from "./topic-display";

// interface Iinfo {
//   id: number;
//   Courses: string;
//   Learn: string[];
//   quiz: { title: string; isDone: boolean }[];
// }
// [];

type myLearningViewType = {
  data: {
    info: {
      id: number;
      Courses: string;
      Learn: string[];
      quiz: { title: string; isDone: boolean }[];
    }[];
  }[];
};

const MyLearningTopics = memo(({ data }: myLearningViewType) => {
  return <TopicsDisplay data={data} />;
});

MyLearningTopics.displayName = "MyLearningTopics";

export default MyLearningTopics;
