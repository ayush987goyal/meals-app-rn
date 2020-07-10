import React from 'react';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import MealList from '../components/MealList';
import CustomHeaderButton from '../components/CustomHeaderButton';

const FavoritesScreen: NavigationStackScreenComponent = props => {
  const favoriteMeals = useSelector((state: RootState) => state.meals.favoriteMeals);

  return <MealList listData={favoriteMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => (navData.navigation as any).toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default FavoritesScreen;
