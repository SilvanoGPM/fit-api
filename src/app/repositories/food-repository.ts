import type { Food } from '@app/entities/food';
import type { Page, Pageable } from './pages.type';

export interface Range {
  min?: number;
  max?: number;
}

export interface SearchFoods extends Pageable {
  name?: string;
  category?: string;
  protein?: Range;
  carbohydrate?: Range;
  lipid?: Range;
  fiber?: Range;
  energy?: Range;
}

export abstract class FoodRepository {
  abstract findMany(pageable: Pageable): Promise<Page<Food>>;
  abstract search(pageable: SearchFoods): Promise<Page<Food>>;
  abstract findByName(name: string): Promise<Food | null>;
  abstract create(food: Food): Promise<void>;
  abstract save(food: Food): Promise<boolean>;

  abstract getCategories(): Promise<Record<number, string>>;
}
