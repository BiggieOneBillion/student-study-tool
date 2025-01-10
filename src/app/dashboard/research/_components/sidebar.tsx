"use client";
import CreateNewDocumentBtn from "./create-new-doc-btn";
import OwnersDocument from "./owners-document";
import SideBarSheet from "./sidebar-sheet-mobile";

export default function SideBar() {
  return (
    <>
      <aside className="hidden h-full bg-gray-100 md:block md:w-[200px]">
        <nav className="flex flex-col items-center px-2 py-5">
          {/* nav menu items */}
          <CreateNewDocumentBtn />
          <section className="flex flex-col space-y-4 py-4 md:max-w-36">
            {/* the owners document */}
            <OwnersDocument />
            {/* shared document with others */}
            {/* <SharedDocument /> */}
          </section>
        </nav>
      </aside>
      <div className="md:hidden fixed top-4 right-5 z-50">
        <SideBarSheet />
      </div>
    </>
  );
}
