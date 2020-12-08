import React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { init } from "./helpers/db";
import AppNavigation from "./navigation/AppNavigation";
import { PlaceReducer } from "./Store/PlaceReducer";

init()
  .then(() => console.log("db initialize"))
  .catch((err) => {
    console.log("db initialize failed", err);
  });

const rootReducer = combineReducers({
  places: PlaceReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({});
