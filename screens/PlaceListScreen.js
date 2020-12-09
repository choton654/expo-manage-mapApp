import React, { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { CustomHeaderButton } from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";
import { fetchPlace } from "../Store/PlaceAction";

const PlaceListScreen = (props) => {
  const { places } = useSelector((state) => state.places);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlace());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          {...itemData}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              PlaceId: itemData.item.id,
              PlaceTitle: itemData.item.title,
            });
          }}
        />
      )}
    />
  );
};

export default PlaceListScreen;

export const PlaceListScreenOptions = (navData) => {
  return {
    headerTitle: "All Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});
