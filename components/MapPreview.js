import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";

const MapPreview = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.mapPreview, ...props.style }}
      onPress={props.onPress}
    >
      {props.location ? (
        <MapView
          style={styles.mapImage}
          region={props.location}
          onRegionChangeComplete={(region) => console.log(region)}
        />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
