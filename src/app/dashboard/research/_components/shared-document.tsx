"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SideBarOption from "./side-options";
import { useAuthStore } from "@/store/user-store";
import { v4 } from "uuid";

interface Idoc {
  id: string;
  title: string;
}

const SharedDocument = () => {
  const { details } = useAuthStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["shared-document"],
    queryFn: async () => {
      const res = await axios.get(`/api/docs/shared/${details.id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <h2 className="text-sm font-semibold text-gray-500">Loading...</h2>;
  }

  if (isError) {
    return (
      <h2 className="text-sm font-semibold text-gray-500">
        Error fetching data
      </h2>
    );
  }

  // console.log(data);

  return (
    <>
      <h2 className="text-sm  font-semibold text-gray-800 underline">Shared Document</h2>
      {data.data.length === 0 ? (
        <h2 className="text-sm font-semibold text-gray-500 p-1 bg-slate-200">
          No Document Found
        </h2>
      ) : (
        <>
          {data.data.map((doc: Idoc) => (
            <SideBarOption
              key={v4()}
              title={doc.title}
              href={`/dashboard/research/doc/${doc.id}`}
            />
          ))}
        </>
      )}
    </>
  );
};
export default SharedDocument;
