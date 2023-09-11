import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Main from "../screen/Home";
import MovieDetails from "../screen/MovieDetails";

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerTitle: "Main" }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{
          headerTitle: "Movie Details",
        }}
      />
    </Stack.Navigator>
  );
};
