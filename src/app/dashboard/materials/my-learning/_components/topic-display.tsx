import React, { memo } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";
import { v4 } from "uuid";
import TopicButton from "./topic-button";

interface Iinfo {
  id: number;
  Courses: string;
  Learn: string[];
  quiz: { title: string; isDone: boolean }[];
}
[];

type topicDisplayType = {
  data: {
    info: {
      id: number;
      Courses: string;
      Learn: string[];
      quiz: { title: string; isDone: boolean }[];
    }[];
  }[];
};

const TopicsDisplay = memo(({ data }: topicDisplayType) => {
  return (
    <div className="grid w-full flex-1 gap-4 overflow-y-scroll">
      {data[0].info.map((result: Iinfo, index: number) => (
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
          <DisclosurePanel className="mt-5 w-full border bg-white px-5 text-sm/5 text-black/50">
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
                  result.Learn.map((lesson: string, i: number) => {
                    const quizDone = result.quiz[i].isDone;
                    return (
                      <TopicButton
                        quizStatus={quizDone}
                        lesson={lesson}
                        infoIndex={index}
                        studyplan={data[0]}
                        key={v4()}
                      />
                    );
                  })}
              </ul>
            </section>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  );
});

TopicsDisplay.displayName = "TopicDisplay";

export default TopicsDisplay;
