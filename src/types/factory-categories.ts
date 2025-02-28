interface FactoryCategoryRes {
  id: number;
  name: string;
  status: number;
}

interface FactoryCategoryBody {
  name?: string;
  status?: number;
  id?: number;
}

interface FactoryCategoryProdsRes {
  name: string;
  validity: number;
  is_returnable: number;
  id: string;
  temperature: string;
}

interface FactoryProductsBody {
  name: string;
  validity: number;
  is_returnable: number;
  category_id: number;
  temperature?: string;
  id?: string;
}

interface CategoryProdsParams {
  category_id: number;
  name?: string;
  enabled?: boolean;
}
