import { Place } from "../model/place";
import { ADD_PLACE, SET_PLACE } from "./PlaceAction";

const initState = {
  places: [],
};

export const PlaceReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_PLACE:
      return {
        places: action.payload.places
          ? action.payload.places.map(
              (p) => new Place(p.id.toString(), p.title, p.imageUri)
            )
          : [],
      };

    case ADD_PLACE:
      const newPlace = new Place(
        action.payload.id.toString(),
        action.payload.title,
        action.payload.newPath
      );
      console.log(newPlace);
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
