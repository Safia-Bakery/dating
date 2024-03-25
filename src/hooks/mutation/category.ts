import { useMutation } from "@tanstack/react-query";
import apiClient from "@/main";

interface Body {
  status?: number;
  id?: string;
  name?: string;
}

const categoryMutation = () => {
  return useMutation({
    mutationKey: ["category"],
    mutationFn: async (body: Body) => {
      if (body.id) {
        const { data } = await apiClient.put({ url: "/v1/category", body });
        return data;
      }
      const { data } = await apiClient.post({ url: "/v1/category", body });
      return data;
    },
  });
};
export default categoryMutation;
