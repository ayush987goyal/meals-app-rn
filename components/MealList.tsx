import React from 'react';
import { StyleSheet, View, FlatList, ListRenderItemInfo } from 'react-native';
import { NavigationRoute, NavigationParams } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';

import { Meal } from '../models/models';
import MealItem from './MealItem';

interface MealListProps {
  listData: Meal[];
  navigation: NavigationStackProp<NavigationRoute<NavigationParams>, NavigationParams>;
}

const MealList: React.FC<MealListProps> = ({ listData, navigation }) => {
  const renderMealData = ({ item }: ListRenderItemInfo<Meal>) => {
    return (
      <MealItem
        meal={item}
        onSelectMeal={() =>
          navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: item.id,
              mealTitle: item.title,
            },
          })
        }
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList<Meal>
        data={listData}
        keyExtractor={item => item.id}
        renderItem={renderMealData}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});

export default MealList;
