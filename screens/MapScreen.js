import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { CommonActions } from "@react-navigation/native";

const MapScreen = ({ navigation }) => {
  const [markerRegion, setmarkerRegion] = useState({
    longitude: 88.363892,
    latitude: 22.572645,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09,
  });

  const selectLoacationHandler = (e) => {
    setmarkerRegion({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09,
    });
  };

  const savePickLocationhandler = useCallback(() => {
    if (!markerRegion) {
      Alert.alert("Error", "Select location", [{ text: "Okay" }]);
      return;
    }

    navigation.dispatch(
      CommonActions.navigate({
        name: "NewPlace",
        params: { pickedLocation: markerRegion },
      })
    );
  }, [markerRegion]);

  useEffect(() => {
    navigation.dispatch(
      CommonActions.setParams({ saveLocation: savePickLocationhandler })
    );
  }, [savePickLocationhandler]);

  return (
    <MapView
      style={styles.container}
      region={markerRegion}
      onPress={selectLoacationHandler}
    >
      {markerRegion && (
        <Marker title="Picked Location" coordinate={markerRegion}></Marker>
      )}
    </MapView>
  );
};

export default MapScreen;

export const MapScreenOptions = (navData) => {
  const routeParams = navData.route.params ? navData.route.params : {};
  const { saveLocation } = routeParams;
  return {
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton} onPress={saveLocation}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
  },
});
