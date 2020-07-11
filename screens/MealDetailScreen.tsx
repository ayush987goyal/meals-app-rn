import React, { useCallback, useLayoutEffect } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';
import { toggleFavorite } from '../store/mealsSlice';
import { MealsStackParamsList } from '../navigation/AppNavigator';
import CustomHeaderButton from '../components/CustomHeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem: React.FC = ({ children }) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{children}</DefaultText>
    </View>
  );
};

interface MealDetailScreenProps {
  navigation: StackNavigationProp<MealsStackParamsList, 'MealDetail'>;
  route: RouteProp<MealsStackParamsList, 'MealDetail'>;
}

const MealDetailScreen: React.FC<MealDetailScreenProps> = ({ navigation, route }) => {
  const { mealId } = route.params;

  const dispatch = useDispatch();
  const availableMeals = useSelector((state: RootState) => state.meals.meals);
  const isFavoriteMeal = useSelector((state: RootState) =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId)
  );

  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const toggleDispatchHandler = useCallback(() => {
    dispatch(toggleFavorite({ mealId }));
  }, [dispatch, mealId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: selectedMeal.title,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Favorite"
            iconName={isFavoriteMeal ? 'ios-star' : 'ios-star-outline'}
            onPress={toggleDispatchHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [isFavoriteMeal, navigation, selectedMeal.title, toggleDispatchHandler]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />

      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>

      <Text style={styles.title}>Ingredients</Text>

      {selectedMeal.ingredients.map(ing => (
        <ListItem key={ing}>{ing}</ListItem>
      ))}

      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
