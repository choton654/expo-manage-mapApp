import React, { useEffect, useState } from "react";
import { Button, Image, Platform, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImgPicker = (props) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      props.onPickImg(result.uri);
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!image ? (
          <Text>No image picked yet</Text>
        ) : (
          <Image source={{ uri: image }} style={styles.pickImage} />
        )}
      </View>
      <Button title="Take Image" onPress={pickImage} />
    </View>
  );
};

export default ImgPicker;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  pickImage: {
    width: "100%",
    height: 200,
  },
});
