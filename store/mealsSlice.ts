import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Meal } from '../models/models';
import { MEALS } from '../data/dummy-data';

interface MealFilters {
  glutenFree: boolean;
  lactoseFree: boolean;
  vegan: boolean;
  vegetarian: boolean;
}

interface MealsState {
  meals: Meal[];
  filteredMeals: Meal[];
  favoriteMeals: Meal[];
  filters: MealFilters;
}

interface ToogleFavoritePayload {
  mealId: string;
}

interface SetFiltersPayload {
  filters: MealFilters;
}

const initialState: MealsState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
  filters: {
    glutenFree: false,
    lactoseFree: false,
    vegan: false,
    vegetarian: false,
  },
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<ToogleFavoritePayload>) => {
      const { mealId } = action.payload;
      const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === mealId);

      if (existingIndex >= 0) {
        state.favoriteMeals.splice(existingIndex, 1);
      } else {
        const mealToAdd = state.meals.find(meal => meal.id === mealId);
        state.favoriteMeals.push(mealToAdd);
      }
    },
    setFilters: (state, action: PayloadAction<SetFiltersPayload>) => {
      const { filters } = action.payload;

      const filteredMeals = state.meals.filter(meal => {
        if (filters.glutenFree && !meal.isGlutenFree) return false;
        if (filters.lactoseFree && !meal.isLactoseFree) return false;
        if (filters.vegan && !meal.isVegan) return false;
        if (filters.vegetarian && !meal.isVegetarian) return false;

        return true;
      });

      state.filteredMeals = filteredMeals;
      state.filters = filters;
    },
  },
});

export const { toggleFavorite, setFilters } = mealsSlice.actions;

export default mealsSlice.reducer;
