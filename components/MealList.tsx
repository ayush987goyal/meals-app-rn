import React from 'react';
import { StyleSheet, View, FlatList, ListRenderItemInfo } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Meal } from '../models/models';
import MealItem from './MealItem';
import { useNavigation } from '@react-navigation/native';
import { MealsStackParamsList } from '../navigation/AppNavigator';

interface MealListProps {
  listData: Meal[];
}

const MealList: React.FC<MealListProps> = ({ listData }) => {
  const navigation = useNavigation<StackNavigationProp<MealsStackParamsList, 'Categories'>>();

  const renderMealData = ({ item }: ListRenderItemInfo<Meal>) => {
    return (
      <MealItem
        meal={item}
        onSelectMeal={() =>
          navigation.navigate('MealDetail', {
            mealId: item.id,
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
