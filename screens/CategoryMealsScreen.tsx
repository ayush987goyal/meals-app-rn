import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../data/dummy-data';
import { RootState } from '../store';
import MealList from '../components/MealList';

const CategoryMealScreen: NavigationStackScreenComponent = props => {
  const availableMeals = useSelector((state: RootState) => state.meals.filteredMeals);
  const catId = props.navigation.getParam('categoryId');

  const displayedMeals = availableMeals.filter(meal => meal.categoryIds.includes(catId));

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealScreen;
