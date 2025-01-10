"use client";

import { CircleAlert } from "lucide-react";

export default function MaterialPage() {
  return (
    <section className="max-w-3xl space-y-3 px-3 pb-10 pt-5 md:px-10">
      <p className="flex items-center gap-2 rounded-md border bg-blue-100 px-3 py-1 text-blue-700">
        <span className="text-[16px] md:text-base ">
          <CircleAlert />
        </span>
        <span className="text-xs md:text-sm">
          To get started, create a document or click on an existing document to
          start working on it.
        </span>
      </p>
      <h3 className="font-bold">Welcome to your research dashboard.</h3>
      <ul className="list-inside list-disc text-sm text-slate-700">
        <li>Here you can chat with your document</li>
        <li>translate it to different languages and more</li>
        <li>Collaborative work</li>
      </ul>
    </section>
  );
}
