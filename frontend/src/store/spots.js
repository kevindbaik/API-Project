import { csrfFetch } from "./csrf";
export const LOAD_SPOTS = 'spots/getSpots';


export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  }
};

export const thunkLoadSpots = () => async(dispatch) => {
  const response = await csrfFetch('/api/spots');
  if(response.ok) {
    const data = await response.json();
    dispatch(loadSpots(data));
    return data;
  }
};

const initialState = {
  allSpots : {}
}

const spotsReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_SPOTS:
    const newState = {};
    action.spots.Spots.forEach((spot) => {
      newState[spot.id] = spot;
    });
    return newState
    default:
      return state
  }
}

export default spotsReducer
