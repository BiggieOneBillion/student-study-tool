import { useAuthStore } from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useOwner(id: string) {
  const [isOwner, setIsOwner] = useState(false);
  const { details } = useAuthStore();
  const { data } = useQuery({
    queryKey: ["is-owner-owner"],
    queryFn: async () => {
      const res = await axios.get(`/api/docs/owner/${details.id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      if (data.data.length > 0) {
        const check = data.data.some((doc: { id: string }) => doc.id === id);
        setIsOwner(check);
      }
    }
  }, [data]);

  return isOwner;
}
