import { Category } from './category.enum';

export interface Plat {
  id?: number;
  name: string;
  description: string;
  prix: number;
  available: boolean;
  category: Category;
  photo?: string;
  allergenes?: string;
}

export interface PlatFilters {
  restaurantId?: number;
  category?: Category;
  available?: boolean;
  minPrice?: number;
  maxPrice?: number;
  name?: string;
}