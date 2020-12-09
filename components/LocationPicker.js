import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";
import MapPreview from "./MapPreview";
import { useRoute } from "@react-navigation/native";

const LocationPicker = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState({
    longitude: 88.363892,
    latitude: 22.572645,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09,
  });
  // geocode api_key 4cb5afdb60e9679b3c9dcbd76f9a3034
  const verifyPermissions = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const mapLocation = route.params ? route.params : {};
  const { onLocationPick } = props;
  useEffect(() => {
    const { pickedLocation } = mapLocation;
    if (pickedLocation) {
      setPickedLocation(pickedLocation);
      onLocationPick(pickedLocation);
    }
  }, [mapLocation, onLocationPick]);

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09,
      });
    } catch (err) {
      console.log(err);
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const pickUpMapHandler = () => {
    navigation.navigate("Map");
  };

  return (
    <View style={styles.container}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickUpMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.buttons}>
        <Button title="Get Location" onPress={getLocationHandler} />
        <Button title="Pick On Map" onPress={pickUpMapHandler} />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  buttons: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
