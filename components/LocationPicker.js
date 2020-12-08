import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { colors } from "../constants/colors";
const LocationPicker = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
    })();
  }, []);

  const getLocation = async () => {
    setloading(true);
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    setLocation(location);
    setloading(false);
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <View style={styles.locationPreview}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Text>{text}</Text>
        )}
      </View>
      <Button title="Get Location" onPress={getLocation} />
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 15,
  },
  locationPreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
