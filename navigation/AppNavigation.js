import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import PlacesNavigation from "./PlacesNavigation";

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <PlacesNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
