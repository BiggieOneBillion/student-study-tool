import { GlobalContext } from "@/context/global-context";
import { useContext } from "react";



export function useGlobal() {
  return useContext(GlobalContext);
}
