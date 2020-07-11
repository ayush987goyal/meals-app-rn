import React, { useLayoutEffect } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES } from '../data/dummy-data';
import { Category } from '../models/models';
import { MealsStackParamsList } from '../navigation/AppNavigator';
import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButton from '../components/CustomHeaderButton';

interface CategoriesScreenProps {
  navigation: StackNavigationProp<MealsStackParamsList, 'Categories'> & DrawerNavigationProp<{}>;
}

const CategoriesScreen: React.FC<CategoriesScreenProps> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Menu" iconName="ios-menu" onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const renderGridItem = (itemData: ListRenderItemInfo<Category>) => (
    <CategoryGridTile
      title={itemData.item.title}
      color={itemData.item.color}
      onSelect={() =>
        navigation.navigate('CategoryMeals', {
          categoryId: itemData.item.id,
        })
      }
    />
  );

  return (
    <FlatList<Category>
      keyExtractor={item => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

export default CategoriesScreen;
