import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { NavigationRoute, NavigationParams } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';

import { Meal } from '../models/models';
import MealItem from './MealItem';

interface MealListProps {
  listData: Meal[];
  navigation: NavigationStackProp<NavigationRoute<NavigationParams>, NavigationParams>;
}

const MealList: React.FC<MealListProps> = ({ listData, navigation }) => {
  return (
    <View style={styles.list}>
      <FlatList<Meal>
        data={listData}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <MealItem
            meal={itemData.item}
            onSelectMeal={() =>
              navigation.navigate({
                routeName: 'MealDetail',
                params: {
                  mealId: itemData.item.id,
                  mealTitle: itemData.item.title,
                },
              })
            }
          />
        )}
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
