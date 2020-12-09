import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { CommonActions } from "@react-navigation/native";

const MapScreen = ({ navigation, route }) => {
  // const initialLocation = navigation.getParam("initialLocation");
  // const readonly = navigation.getParam("readonly");

  const routeParams = route.params ? route.params : {};
  const { initialLocation, readonly } = routeParams;

  const [markerRegion, setmarkerRegion] = useState({
    longitude: initialLocation ? initialLocation.longitude : 88.363892,
    latitude: initialLocation ? initialLocation.latitude : 22.572645,
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
    if (readonly) {
      return;
    }

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
        <Marker title="Picked Location" coordinate={markerRegion} />
      )}
    </MapView>
  );
};

export default MapScreen;

export const MapScreenOptions = (navData) => {
  const routeParams = navData.route.params ? navData.route.params : {};
  const { saveLocation, readonly } = routeParams;
  // const readonly = navData.navigation.getParam('readonly');
  if (readonly) {
    return {};
  }
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
