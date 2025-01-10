"use client";

import React from "react";

const home = () => {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="flex flex-col items-center space-y-5 text-center sm:space-y-6">
        {/* header */}
        <h1 className="text-xl font-medium text-black md:text-3xl">
          Welcome To AI Study Plan
        </h1>
        {/* description */}
        <div className="text-sm text-black/70 ">
          <p>This is your own personal AI study planner.</p>
          <p>Choose a topic and the level of difficulty you want to study.</p>
        </div>
      </div>
    </section>
  );
};

export default home;
