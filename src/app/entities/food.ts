import { BaseEntity, BaseEntityProps } from './base-entity';

interface Macro {
  quantity: number;
  unit: string;
}

interface Energy {
  kcal: number;
  kj: number;
}

export interface FoodProps {
  name: string;
  images: string[];
  baseQuantity: number;
  baseUnit: string;
  category: string;
  protein: Macro;
  carbohydrate: Macro;
  lipid: Macro;
  fiber: Macro;
  energy: Energy;
}

export interface CreateFoodProps extends BaseEntityProps {
  name: string;
  category: string;
  protein: number;
  carbohydrate: number;
  lipid: number;
  fiber: number;
  energy: number;
  images?: string[];
}

export class Food extends BaseEntity<FoodProps> {
  constructor({ id, createdAt, updatedAt, ...props }: CreateFoodProps) {
    super({ id, createdAt, updatedAt });

    this.props = {
      name: props.name,
      category: props.category,
      baseQuantity: 100,
      baseUnit: 'g',
      images: props.images || [],

      energy: {
        kcal: props.energy,
        kj: props.energy / 0.2390057,
      },

      carbohydrate: {
        quantity: props.carbohydrate,
        unit: 'g',
      },

      protein: {
        quantity: props.protein,
        unit: 'g',
      },

      lipid: {
        quantity: props.lipid,
        unit: 'g',
      },

      fiber: {
        quantity: props.fiber,
        unit: 'g',
      },
    };
  }

  public get name() {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get images() {
    return this.props.images;
  }

  public addImage(image: string) {
    this.props.images.push(image);
  }

  public get baseQuantity() {
    return this.props.baseQuantity;
  }

  public set baseQuantity(baseQuantity: number) {
    this.props.baseQuantity = baseQuantity;
  }

  public get baseUnit() {
    return this.props.baseUnit;
  }

  public set baseUnit(baseUnit: string) {
    this.props.baseUnit = baseUnit;
  }

  public get category() {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get protein() {
    return this.props.protein;
  }

  public set protein(protein: Macro) {
    this.props.protein = protein;
  }

  public get lipid() {
    return this.props.lipid;
  }

  public set lipid(lipid: Macro) {
    this.props.lipid = lipid;
  }

  public get carbohydrate() {
    return this.props.carbohydrate;
  }

  public set carbohydrate(carbohydrate: Macro) {
    this.props.carbohydrate = carbohydrate;
  }

  public get fiber() {
    return this.props.fiber;
  }

  public set fiber(fiber: Macro) {
    this.props.fiber = fiber;
  }

  public get energy() {
    return this.props.energy;
  }

  public set energy(energy: Energy) {
    this.props.energy = energy;
  }
}
