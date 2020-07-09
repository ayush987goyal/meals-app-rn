import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import { Meal } from '../models/models';

const CategoryMealScreen: NavigationStackScreenComponent = (props) => {
  const catId = props.navigation.getParam('categoryId');

  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(catId)
  );

  return (
    <View style={styles.screen}>
      <FlatList<Meal>
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={(mealItem) => (
          <View>
            <Text>{mealItem.item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

CategoryMealScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryMealScreen;
