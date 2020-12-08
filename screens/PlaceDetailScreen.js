import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PlaceDetailScreen = ({ route }) => {
  const { PlaceId, PlaceTitle } = route.params;
  console.log(PlaceId, PlaceTitle);
  return (
    <View>
      <Text>PlaceDetail Screen</Text>
    </View>
  );
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({});
