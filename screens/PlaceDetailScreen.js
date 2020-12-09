import React from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import MapPreview from "../components/MapPreview";
import { colors } from "../constants/colors";

const PlaceDetailScreen = ({ route, navigation }) => {
  const { PlaceId, PlaceTitle } = route.params;

  const selectedPlace = useSelector((state) =>
    state.places.places.find((place) => place.id === PlaceId)
  );

  const selectedLocation = {
    latitude: selectedPlace.lat,
    longitude: selectedPlace.lng,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09,
  };

  const showMapHandler = () => {
    navigation.navigate("Map", {
      readonly: true,
      initialLocation: selectedLocation,
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image style={styles.image} source={{ uri: selectedPlace.image }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          onPress={showMapHandler}
          location={selectedLocation}
        />
      </View>
    </ScrollView>
  );
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
