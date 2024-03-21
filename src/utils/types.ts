import { type } from "os";

export enum Language {
  ru = "ru",
  uz = "uz",
}
export type MeTypes = {
  id: number;
  username: string;
  full_name: string;
  status: number;
  created_at: string;
  updated_at: string;
};

export type ProductType = {
  product_type: string | null;
  name: string | null;
  validity: number | null;
  num: string | null;
  parent_id: null | string;
  total_price: number | null;
  status: number | null;
  updated_at: null | string;
  code: string | null;
  id: string | null;
  price: number | null;
  main_unit: string | null;
  amount_left: null | number;
  created_at: string | null;
  description: string | null;
  qr: string;
};

export type GroupType = {
  status: number;
  id: string;
  code: string;
  category: null | string;
  created_at: string;
  name: string;
  description: string;
  num: string;
  parent_id: null | string;
  updated_at: null | string;
};
export interface ProductGroupTypes {
  groups: GroupType[];
  products: ProductType[];
}
