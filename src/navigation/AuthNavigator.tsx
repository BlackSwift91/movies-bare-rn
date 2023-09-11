import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import LogIn from '../screen/LogIn';
import SignUp from '../screen/SignUp';

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{headerTitle: 'LogIn'}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerTitle: 'SignUp'}}
      />
    </Stack.Navigator>
  );
};
