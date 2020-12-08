import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import MapScreen from "../screens/MapScreen";
import NewPlaceScreen, {
  NewPlaceScreenOptions,
} from "../screens/NewPlaceScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import PlaceListScreen, {
  PlaceListScreenOptions,
} from "../screens/PlaceListScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
};

const PlacesNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="Places"
        component={PlaceListScreen}
        options={PlaceListScreenOptions}
      />
      <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
      <Stack.Screen
        name="NewPlace"
        component={NewPlaceScreen}
        options={NewPlaceScreenOptions}
      />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};

export default PlacesNavigation;

const styles = StyleSheet.create({});
