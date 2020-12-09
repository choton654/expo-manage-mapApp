import * as FileSystem from "expo-file-system";
import { API_KEY } from "../env";
import { getPlaces, insertPlace } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACE = "SET_PLACE";

export const addPlace = (title, img, place) => async (dispatch) => {
  try {
    let newPath = "";
    if (img) {
      const filename = img.split("/").pop();
      newPath = FileSystem.documentDirectory + filename;
      await FileSystem.moveAsync({ from: img, to: newPath });
    }

    const res = await fetch(
      `http://api.positionstack.com/v1/reverse?access_key=${API_KEY.key}&query=${place.latitude},${place.longitude}&limit=1`
    );

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const { data } = await res.json();

    const address = data[0].label;

    const resData = await insertPlace(
      title || "",
      newPath,
      address,
      place.latitude,
      place.longitude
    );
    dispatch({
      type: ADD_PLACE,
      payload: {
        id: resData.insertId,
        title,
        newPath,
        address,
        cords: { lat: data[0].latitude, lng: data[0].longitude },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchPlace = () => async (dispatch) => {
  try {
    const resData = await getPlaces();
    console.log(resData);
    dispatch({
      type: SET_PLACE,
      payload: { places: resData.rows._array },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
