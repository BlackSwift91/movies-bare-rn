import React from 'react';

import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { COLORS } from '../assets/theme';
import { useAppSelector } from '../store/hooks';
import { BottomNavigator } from './BottomNavigator';

export const RootNavigation = () => {
  const token = useAppSelector(state => state.userReducer.token);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.WHITE} barStyle="dark-content" />
      {token ? <BottomNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
