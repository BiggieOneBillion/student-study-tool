"use client";

import EditTitleForm from "./edit-title-form";
import Editor from "./editor";

export default function DocumentView() {
  return (
    <section className="mt-10">
      <div className="mx-auto flex max-w-6xl justify-between pb-5">
        {/* edit title */}
        <EditTitleForm />
      </div>
      <Editor />
    </section>
  );
}
