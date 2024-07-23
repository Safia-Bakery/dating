import { useMutation } from "@tanstack/react-query";
import apiClient from "@/main";

interface Body {
  validity: number;
  status?: number;
  name: string;
  id?: string;
  description?: string;
  qr: string;
  category_id?: number;
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
