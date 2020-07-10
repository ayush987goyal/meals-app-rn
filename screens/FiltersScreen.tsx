import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/CustomHeaderButton';
import Colors from '../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setFilters } from '../store/mealsSlice';

interface FilterSwitchProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

const FilterSwitch: React.FC<FilterSwitchProps> = ({ label, value, onChange }) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor, false: '' }}
        thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
        value={value}
        onValueChange={onChange}
      />
    </View>
  );
};

const FiltersScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const dispatch = useDispatch();
  const mealFilters = useSelector((state: RootState) => state.meals.filters);

  const [isGlutenFree, setIsGlutenFree] = useState(mealFilters.glutenFree);
  const [isLactoseFree, setIsLactoseFree] = useState(mealFilters.lactoseFree);
  const [isVegan, setIsVegan] = useState(mealFilters.vegan);
  const [isVegetarian, setIsVegetarian] = useState(mealFilters.vegetarian);

  const saveFilters = useCallback(() => {
    dispatch(
      setFilters({
        filters: {
          glutenFree: isGlutenFree,
          lactoseFree: isLactoseFree,
          vegan: isVegan,
          vegetarian: isVegetarian,
        },
      })
    );
  }, [dispatch, isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        value={isGlutenFree}
        onChange={val => setIsGlutenFree(val)}
      />
      <FilterSwitch
        label="Lactose-free"
        value={isLactoseFree}
        onChange={val => setIsLactoseFree(val)}
      />
      <FilterSwitch label="Vegan" value={isVegan} onChange={val => setIsVegan(val)} />
      <FilterSwitch
        label="Vegetarian"
        value={isVegetarian}
        onChange={val => setIsVegetarian(val)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => (navData.navigation as any).toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Save" iconName="ios-save" onPress={navData.navigation.getParam('save')} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15,
  },
});

export default FiltersScreen;
