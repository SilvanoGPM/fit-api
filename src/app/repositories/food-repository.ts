import type { Food } from '@app/entities/food';
import type { Page, Pageable } from './pages.type';

export abstract class FoodRepository {
  abstract findMany(pageable: Pageable): Promise<Page<Food>>;
  abstract findByName(name: string): Promise<Food | null>;
}
