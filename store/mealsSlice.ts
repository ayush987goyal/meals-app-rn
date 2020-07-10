import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Meal } from '../models/models';
import { MEALS } from '../data/dummy-data';

interface MealsState {
  meals: Meal[];
  filteredMeals: Meal[];
  favoriteMeals: Meal[];
}

interface ToogleFavoritePayload {
  mealId: string;
}

const initialState: MealsState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
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
  },
});

export const { toggleFavorite } = mealsSlice.actions;

export default mealsSlice.reducer;
