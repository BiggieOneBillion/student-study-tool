import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const Header = () => {
  const router = useRouter();
  return (
    <header className="flex items-center gap-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 rounded-md bg-black px-2 py-1 text-sm font-semibold text-white"
      >
        <ChevronLeft size={16} />
      </button>
      <p className="text-xl font-semibold">My learning page</p>
    </header>
  );
};

export default Header;
