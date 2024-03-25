import { useQuery } from "@tanstack/react-query";
import apiClient from "@/main";
import { tokenSelector } from "reducers/auth";
import { useAppSelector } from "@/store/rootConfig";
import { CategoriesType } from "@/utils/types";

interface Body {
  name?: string;
  id?: number;
  status?: string;
  enabled?: boolean;
  page?: number;
}

export const useCategories = ({ enabled, ...params }: Body) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () =>
      apiClient
        .get({ url: "/v1/category", params })
        .then(({ data: response }) => response as CategoriesType),
    enabled: enabled && !!token,
  });
};
export default useCategories;
