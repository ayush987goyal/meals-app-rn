import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import MealList from '../components/MealList';
import CustomHeaderButton from '../components/CustomHeaderButton';
import DefaultText from '../components/DefaultText';

interface FavoritesScreenProps {
  navigation: StackNavigationProp<{}> & DrawerNavigationProp<{}>;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const favoriteMeals = useSelector((state: RootState) => state.meals.favoriteMeals);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Menu" iconName="ios-menu" onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  if (!favoriteMeals || !favoriteMeals.length) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meals found. Start adding some!</DefaultText>
      </View>
    );
  }

  return <MealList listData={favoriteMeals} />;
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesScreen;
