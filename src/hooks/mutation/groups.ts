import { useMutation } from "@tanstack/react-query";
import apiClient from "@/main";

interface Body {
  validity: number;
  status?: number;
  id?: string;
  description?: string;
}

const groupsMutation = () => {
  return useMutation({
    mutationKey: ["groups"],
    mutationFn: async (body: Body) => {
      const { data } = await apiClient.put({ url: "/v1/groups", body });
      return data;
    },
  });
};
export default groupsMutation;
