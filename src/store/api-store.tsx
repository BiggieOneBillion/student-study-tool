import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type keyState = {
  key: string;
  setKey: (value: string) => void;
};

export const useKeyStore = create<keyState>()(
  persist(
    (set) => ({
      key: "",
      setKey: (value) => {
        set({ key: value });
      },
    }),
    {
      name: "key", // Key name in sessionStorage
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage instead of localStorage
    },
  ),
);
