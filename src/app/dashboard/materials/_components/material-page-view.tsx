"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { v4 } from "uuid";
import { CircleAlert } from "lucide-react";
import TeneryConditions from "@/components/global/tenery-conditions";
import Conditions from "@/components/global/single-conditions";
import Link from "next/link";
import { useAuthStore } from "@/store/user-store";

type materialType = {
  topic: string;
  level: string;
  info: object[];
};

const MaterialPageView = () => {
  const details = useAuthStore((state) => state.details);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["material"],
    queryFn: async () => {
      const response = await axios.get(`/api/study-plan/${details.id}`);
      return response.data;
    },
  });

  if (isLoading) {
    return <div className="text-black">Loading...</div>;
  }

  if (isError || data === false) {
    return <div className="text-black">Error fetching data</div>;
  }

  // console.log(data);

  return (
    <section className="flex flex-col gap-5">
      <header>
        <h1 className="text-2xl font-medium">
          Materials
          <Conditions condition={data && data.length > 0}>
            {`(${data && data.length || 0})`}
          </Conditions>
        </h1>
        <TeneryConditions
          condition={data && data.length > 0}
          ifTrue={
            <p className="flex flex-col text-sm text-black/60">
              <span>This is a list of all your study materials</span>
              <span> You can click on the card to see the details.</span>
            </p>
          }
          ifFalse={
            <p className="flex w-fit items-center gap-2 rounded-md bg-slate-100 px-2 py-1 text-sm text-black/60">
              <CircleAlert size={15} /> Go to the home page to add materials
            </p>
          }
        />
      </header>
      <TeneryConditions
        condition={data && data.length > 0}
        ifTrue={
          <section className="flex flex-wrap items-start gap-x-5 gap-y-10">
            {data && data.map((material: materialType, index: number) => (
              <Link
                href={`/dashboard/materials/my-learning/${index}`}
                key={v4()}
                className="rounded-md border border-gray-200 bg-white p-5"
              >
                <h2 className="flex items-center gap-2 font-semibold">
                  <span className="text-black/60">Lesson Topic:</span>{" "}
                  {material.topic}
                </h2>
                <p className="flex items-center gap-2 capitalize text-gray-500">
                  <span>Level:</span> {material.level}
                </p>
                <p className="flex items-center gap-2 capitalize text-gray-500">
                  <span>Lesson Modules:</span> {material.info.length}
                </p>
              </Link>
            ))}
          </section>
        }
        ifFalse={
          <p className="text-4xl font-extrabold text-black/10">
            No study materials found
          </p>
        }
      />
    </section>
  );
};

export default MaterialPageView;
