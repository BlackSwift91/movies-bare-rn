import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddMovie from '../screen/AddMovie';
import AddMovieIcon from '../assets/svg/AddMovieIcon';
import SettingsIcon from '../assets/svg/SettingsIcon';
import MovieIcon from '../assets/svg/MovieIcon';
import { StackNavigator } from './StackNavigator';

import Settings from '../screen/Settings';

const Tab = createBottomTabNavigator();

export function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          headerTitle: 'Home',
          tabBarIcon: ({ focused }) => <MovieIcon focused={focused} />,
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AddMovie"
        component={AddMovie}
        options={{
          headerTitle: 'Add Movie',
          tabBarIcon: ({ focused }) => <AddMovieIcon focused={focused} />,
          tabBarShowLabel: false,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: 'Settings',
          tabBarIcon: ({ focused }) => <SettingsIcon focused={focused} />,
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
}
