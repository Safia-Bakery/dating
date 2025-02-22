import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "@/main";
import { tokenSelector } from "@/store/reducers/auth";
import { useAppSelector } from "@/store/rootConfig";

export const factoryCategoryMutation = () => {
  return useMutation({
    mutationKey: ["factory_category_mutation"],
    mutationFn: async ({ id, ...body }: FactoryCategoryBody) => {
      const { data } = await apiClient[!!id ? "put" : "post"]({
        url: "/factory/category",
        body,
        ...(!!id && { params: { id } }),
      });
      return data;
    },
  });
};

export const getFactoryCategories = ({ enabled = true }) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["factory_categories"],
    queryFn: () =>
      apiClient
        .get({ url: "/factory/category" })
        .then(({ data: response }) => response as FactoryCategoryRes[]),
    enabled: !!token && enabled,
  });
};

export const getFactoryCategory = ({
  enabled = true,
  id,
}: {
  id: number;
  enabled?: boolean;
}) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["factory_category", id],
    queryFn: () =>
      apiClient
        .get({ url: `/factory/category/${id}` })
        .then(({ data: response }) => response as FactoryCategoryRes),
    enabled: !!token && enabled,
  });
};

export const factoryProductMutation = () => {
  return useMutation({
    mutationKey: ["factory_product_mutation"],
    mutationFn: async ({ id, ...body }: FactoryProductsBody) => {
      const { data } = await apiClient[!!id ? "put" : "post"]({
        url: "/factory/products",
        body,
        ...(!!id && { params: { id } }),
      });
      return data;
    },
  });
};

export const getFactoryCategoryProd = ({
  enabled = true,
  ...params
}: CategoryProdsParams) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["factory_categories_prod", params],
    queryFn: () =>
      apiClient
        .get({ url: "/factory/category/products", params })
        .then(({ data: response }) => response as FactoryCategoryProdsRes[]),
    enabled: !!token && enabled,
  });
};

export const getFactoryProduct = ({
  enabled = true,
  id,
}: {
  id: string;
  enabled: boolean;
}) => {
  const token = useAppSelector(tokenSelector);
  return useQuery({
    queryKey: ["factory_category_product", id],
    queryFn: () =>
      apiClient
        .get({ url: `/factory/products/${id}` })
        .then(({ data: response }) => response as FactoryCategoryProdsRes),
    enabled: !!token && enabled,
  });
};
