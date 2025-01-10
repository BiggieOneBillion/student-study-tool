"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSheetContext } from "./sidebar-sheet-mobile";
// import { useDocumentData } from "react-firebase-hooks/firestore";

const SideBarOption = ({ href, title }: { href: string; title: string }) => {
  //   const [data, loading, error] = useDocumentData(doc(db, "documents", id));

  const pathname = usePathname();

  const router = useRouter();

  const isActive = href.includes(pathname) && pathname !== "/";

  const context = useSheetContext();

  const handleBtnClick = () => {
    router.push(href);
    context?.handleClose();
  };

  //   if (!data) return null;

  return (
    <button
      // href={href}
      onClick={handleBtnClick}
      className={`rounded-md border p-2 ${
        isActive ? "border-black bg-gray-300 font-medium" : "border-gray-400"
      }`}
    >
      <p className="truncate text-sm">{title}</p>
    </button>
  );
};
export default SideBarOption;
