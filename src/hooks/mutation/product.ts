import { useMutation } from "@tanstack/react-query";
import apiClient from "@/main";

interface Body {
  validity: number;
  status?: number;
  id?: number;
}

const productMutation = () => {
  return useMutation({
    mutationKey: ["product"],
    mutationFn: async (body: Body) => {
      const { data } = await apiClient.put({ url: "/v1/products", body });
      return data;
    },
  });
};
export default productMutation;
