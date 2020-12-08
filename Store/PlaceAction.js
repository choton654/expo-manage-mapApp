import * as FileSystem from "expo-file-system";
import { getPlaces, insertPlace } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACE = "SET_PLACE";

export const addPlace = (title, img) => async (dispatch) => {
  const filename = img.split("/").pop();
  const newPath = FileSystem.documentDirectory + filename;

  try {
    await FileSystem.moveAsync({ from: img, to: newPath });
    const resData = await insertPlace(title, newPath, "Kolkata", 12.5, 13.5);
    console.log(resData);
    dispatch({
      type: ADD_PLACE,
      payload: { id: resData.insertId, title, newPath },
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
      payload: { places: resData.rows._array || [] },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
