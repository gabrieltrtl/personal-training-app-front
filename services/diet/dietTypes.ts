export type FoodItem = {
  name: string;
  quantity: string;
  notes?: string;
};

export type Meal = {
  title: string;
  items: FoodItem[];
};

export type DietTemplate = {
  
}