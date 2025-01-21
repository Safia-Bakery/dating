import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "@/main";
import { tokenSelector } from "reducers/auth";
import { useAppSelector } from "@/store/rootConfig";
import { UserRes } from "@/utils/types";

interface Params {
  parent_id?: string;
  enabled?: boolean;
}

interface Body {
  user_id: number;
  category_id: number[];
  isDelete?: boolean;
}

export const useUsers = ({ enabled, ...params }: Params) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["users", params],
    queryFn: () =>
      apiClient
        .get({ url: "/users", params })
        .then(({ data: response }) => response as UserRes[]),
    enabled: enabled && !!token,
  });
};

export const useUser = ({ enabled, id }: { enabled?: boolean; id: number }) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      apiClient
        .get({ url: `/users/${id}` })
        .then(({ data: response }) => response as UserRes),
    enabled: enabled && !!token,
  });
};

export const userMutation = () => {
  return useMutation({
    mutationKey: ["user_mutation"],
    mutationFn: async ({ isDelete, ...body }: Body) => {
      if (isDelete) {
        const { data } = await apiClient.delete({
          url: "/users/category",
          body,
        });
        return data;
      }
      const { data } = await apiClient.post({ url: "/users/category", body });
      return data;
    },
  });
};
