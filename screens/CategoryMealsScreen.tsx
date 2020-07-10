import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import { RootState } from '../store';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealScreen: NavigationStackScreenComponent = props => {
  const availableMeals = useSelector((state: RootState) => state.meals.filteredMeals);
  const catId = props.navigation.getParam('categoryId');

  const displayedMeals = availableMeals.filter(meal => meal.categoryIds.includes(catId));

  if (!displayedMeals || !displayedMeals.length) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found. Maybe check your filters?</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryMealScreen;
