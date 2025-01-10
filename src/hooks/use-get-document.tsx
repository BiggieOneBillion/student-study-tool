import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetDocument(id: string) {
  return useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const res = await axios.get(`/api/docs/${id}`);
      return res.data;
    },
  });
}