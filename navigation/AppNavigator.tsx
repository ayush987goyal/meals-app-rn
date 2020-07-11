import React from 'react';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Colors from '../constants/Colors';
import FiltersScreen from '../screens/FiltersScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const MealsStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const TabsMat = createMaterialBottomTabNavigator();
const Tabs = createBottomTabNavigator();
const FiltersStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultNavigationOptions: StackNavigationOptions = {
  headerStyle: { backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '' },
  headerTitleStyle: { fontFamily: 'open-sans-bold' },
  headerBackTitleStyle: { fontFamily: 'open-sans' },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
};

const MealsStackScreen = () => (
  <MealsStack.Navigator screenOptions={defaultNavigationOptions}>
    <MealsStack.Screen
      name="Categories"
      component={CategoriesScreen}
      options={{ headerTitle: 'Meal Categories' }}
    />
    <MealsStack.Screen name="CategoryMeals" component={CategoryMealScreen} />
    <MealsStack.Screen name="MealDetail" component={MealDetailScreen} />
  </MealsStack.Navigator>
);

const FavoritesStackScreen = () => (
  <FavoritesStack.Navigator screenOptions={defaultNavigationOptions}>
    <FavoritesStack.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={{ headerTitle: 'Your Favorites' }}
    />
    <FavoritesStack.Screen name="MealDetail" component={MealDetailScreen} />
  </FavoritesStack.Navigator>
);

const MealsFavTabsScreen = () => {
  const mealsScreenOptions: any = {
    tabBarIcon: (tabInfo: any) => (
      <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
    ),
    tabBarColor: Colors.primaryColor,
    tabBarLabel:
      Platform.OS === 'android' ? (
        <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
      ) : (
        'Meals'
      ),
  };

  const favScreenOptions: any = {
    tabBarIcon: (tabInfo: any) => <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />,
    tabBarColor: Colors.accentColor,
    tabBarLabel:
      Platform.OS === 'android' ? (
        <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
      ) : (
        'Favorites'
      ),
  };

  return Platform.OS === 'android' ? (
    <TabsMat.Navigator
      activeColor="white"
      shifting={true}
      barStyle={{ backgroundColor: Colors.primaryColor }}
    >
      <TabsMat.Screen name="Meals" component={MealsStackScreen} options={mealsScreenOptions} />
      <TabsMat.Screen
        name="Favorites"
        component={FavoritesStackScreen}
        options={favScreenOptions}
      />
    </TabsMat.Navigator>
  ) : (
    <Tabs.Navigator
      tabBarOptions={{
        labelStyle: { fontFamily: 'open-sans' },
        activeTintColor: Colors.accentColor,
      }}
    >
      <Tabs.Screen name="Meals" component={MealsStackScreen} options={mealsScreenOptions} />
      <Tabs.Screen name="Favorites" component={FavoritesStackScreen} options={favScreenOptions} />
    </Tabs.Navigator>
  );
};

const FiltersStackScreen = () => (
  <FiltersStack.Navigator screenOptions={defaultNavigationOptions}>
    <FiltersStack.Screen
      name="Filters"
      component={FiltersScreen}
      options={{ headerTitle: 'Filter Meals' }}
    />
  </FiltersStack.Navigator>
);

const AppNavigator = () => (
  <Drawer.Navigator
    drawerContentOptions={{
      activeTintColor: Colors.accentColor,
      labelStyle: { fontFamily: 'open-sans-bold' },
    }}
  >
    <Drawer.Screen
      name="MealsFavs"
      component={MealsFavTabsScreen}
      options={{ drawerLabel: 'Meals' }}
    />
    <Drawer.Screen name="Filters" component={FiltersStackScreen} />
  </Drawer.Navigator>
);

export type MealsStackParamsList = {
  Categories: undefined;
  CategoryMeals: { categoryId: string };
  MealDetail: { mealId: string };
};

export default AppNavigator;
