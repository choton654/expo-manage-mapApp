import { Place } from "../model/place";
import { ADD_PLACE, SET_PLACE } from "./PlaceAction";

const initState = {
  places: [],
};

export const PlaceReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_PLACE:
      return {
        places: action.payload.places.map((p) => {
          return new Place(
            p.id.toString(),
            p.title,
            p.imageUri,
            p.address,
            p.lat,
            p.lng
          );
        }),
      };

    case ADD_PLACE:
      const newPlace = new Place(
        action.payload.id.toString(),
        action.payload.title,
        action.payload.newPath,
        action.payload.address,
        action.payload.cords.lat,
        action.payload.cords.lng
      );
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
