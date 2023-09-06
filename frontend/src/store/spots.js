import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/getSpots';
export const LOAD_DETAILS ='spots/getSpotDetails';
export const DELETE_SPOT = 'spots/deleteSpot';
export const CLEAR_SPOT = 'spots/clearSpot';

const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots
  }
};

const getSpotDetails = (spot) => ({
  type: LOAD_DETAILS,
  spot
});

const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId
})

export const clearSpot = () => ({
    type: CLEAR_SPOT
})

export const thunkLoadSpots = () => async(dispatch) => {
  const response = await csrfFetch('/api/spots');

  if(response.ok) {
    const data = await response.json();
    dispatch(loadSpots(data));
    return data;
  }
};

export const thunkGetSpotDetails = (spotId) => async(dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if(response.ok) {
    const data = await response.json();
    dispatch(getSpotDetails(data));
    return data;
  } else {
    const errors = await response.json();
    console.log(errors)
    return errors
  }
};

export const thunkCreateSpot = (spot) => async(dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(spot)
  });

  if(response.ok) {
    const data = await response.json();
    return data;
  }
};

export const thunkUpdateSpot = (spotId, spot) => async(dispatch) => {
  console.log(spot)
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(spot)
  });

  if(response.ok) {
    const data = await response.json();
    return data;
  }
}

export const thunkCreateImageForSpot = (newSpotId, url, preview) => async(dispatch) => {
  if(url === "") return null;
  const response = await csrfFetch(`/api/spots/${newSpotId}/images`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({url, preview})
  });

  if(response.ok) {
    const data = await response.json();
    return data;
  }
};

export const thunkLoadUserSpots = () => async(dispatch) => {
  const response = await csrfFetch('/api/spots/current');
  if(response.ok) {
    const data = await response.json();
    dispatch(loadSpots(data));
    return data;
  };
};

export const thunkDeleteSpot = (spotId) => async(dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE"
  })

  if(response.ok) {
    const data = await response.json();
    dispatch(deleteSpot(spotId));
    return data
  }
}

const initialState = {
  allSpots : {},
  oneSpot: {},
}

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_SPOTS:
      newState = { ...state,
        allSpots: {}
      }
      action.spots.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    case LOAD_DETAILS:
      newState = {...state,
        oneSpot:{} }
      newState.oneSpot = action.spot
      return newState;
    case CLEAR_SPOT:
        return {
          ...state,
          oneSpot: {}
        }
    case DELETE_SPOT:
      newState = { ...state, allSpots : { ...state.allSpots }, oneSpot: { ...state.oneSpot }}
      delete newState.allSpots[action.spotId];
      delete newState.oneSpot[action.spotId];
      return newState;
    default:
      return state
  }
}

export default spotsReducer
