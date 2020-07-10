import { createSlice } from '@reduxjs/toolkit';

import { Meal } from '../models/models';
import { MEALS } from '../data/dummy-data';

interface MealsState {
  meals: Meal[];
  filteredMeals: Meal[];
  favoriteMeals: Meal[];
}

const initialState: MealsState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {},
});

export default mealsSlice.reducer;
