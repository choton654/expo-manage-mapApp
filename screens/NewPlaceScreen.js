import { CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import ImgPicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import { colors } from "../constants/colors";
import { addPlace } from "../Store/PlaceAction";

const NewPlaceScreen = (props) => {
  const [title, settitle] = useState("");
  const [pickImg, setpickImg] = useState(null);
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(addPlace(title, pickImg));
    props.navigation.dispatch(CommonActions.goBack());
    settitle("");
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Title</Text>
      <TextInput
        style={styles.textInput}
        value={title}
        onChangeText={(text) => settitle(text)}
      />
      <ImgPicker onPickImg={(imgUri) => setpickImg(imgUri)} />
      <LocationPicker />
      <Button
        title="Add Place"
        color={colors.primary}
        onPress={submitHandler}
      />
    </View>
  );
};

export default NewPlaceScreen;

export const NewPlaceScreenOptions = (navData) => {
  return {
    headerTitle: "Add Place",
  };
};

const styles = StyleSheet.create({
  form: { margin: 20 },
  title: { fontSize: 25 },
  textInput: {
    marginVertical: 10,
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
  },
});
