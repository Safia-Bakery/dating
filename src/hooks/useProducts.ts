import { useQuery } from "@tanstack/react-query";
import apiClient from "@/main";
import { tokenSelector } from "reducers/auth";
import { useAppSelector } from "@/store/rootConfig";
import { ProductGroupTypes } from "@/utils/types";

interface Body {
  parent_id?: string;
  enabled?: boolean;
}

export const useProducts = ({ enabled, ...params }: Body) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["products", params],
    queryFn: () =>
      apiClient
        .get({ url: "/v1/products", params })
        .then(({ data: response }) => response as ProductGroupTypes),
    enabled: enabled && !!token,
  });
};
export default useProducts;
