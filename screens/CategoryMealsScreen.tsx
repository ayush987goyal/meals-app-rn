import React, { useLayoutEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import { RootState } from '../store';
import { MealsStackParamsList } from '../navigation/AppNavigator';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

interface CategoryMealScreenProps {
  navigation: StackNavigationProp<MealsStackParamsList, 'CategoryMeals'>;
  route: RouteProp<MealsStackParamsList, 'CategoryMeals'>;
}

const CategoryMealScreen: React.FC<CategoryMealScreenProps> = ({ navigation, route }) => {
  const availableMeals = useSelector((state: RootState) => state.meals.filteredMeals);
  const catId = route.params.categoryId;
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  const displayedMeals = availableMeals.filter(meal => meal.categoryIds.includes(catId));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: selectedCategory.title,
    });
  }, [navigation, selectedCategory.title]);

  if (!displayedMeals || !displayedMeals.length) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found. Maybe check your filters?</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} />;
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryMealScreen;
