import { Category } from './category.interface.ts';
import { Equipment } from './equipment.interface.ts';

export interface CategoryWithEquipments extends Category {
  equipments: Equipment[];
}
