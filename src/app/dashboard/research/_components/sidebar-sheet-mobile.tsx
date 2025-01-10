import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CreateNewDocumentBtn from "./create-new-doc-btn";
import OwnersDocument from "./owners-document";
import { createContext, useContext, useState } from "react";

const SheetContext = createContext<{ handleClose: () => void } | null>(null);

export const useSheetContext = () => {
  const context = useContext(SheetContext);
  // if (!context) {
  //     throw new Error("useUser must be used within the UserContext");
  // }
  return context;
};

export default function SideBarSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <SheetContext.Provider value={{ handleClose }}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <aside className="bg-gray-100y mt-3 h-full md:w-[200px]">
            <nav className="flex flex-col items-start px-2 py-5">
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
        </SheetContent>
      </Sheet>
    </SheetContext.Provider>
  );
}
