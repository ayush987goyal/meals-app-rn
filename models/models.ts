export interface Category {
  id: string;
  title: string;
  color: string;
}

export interface Meal {
  id: string;
  categoryIds: string[];
  title: string;
  affordability: 'affordable' | 'pricey' | 'luxurious';
  complexity: 'simple' | 'challenging' | 'hard';
  imageUrl: string;
  duration: number;
  ingredients: string[];
  steps: string[];
  isGlutenFree: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  isLactoseFree: boolean;
}
