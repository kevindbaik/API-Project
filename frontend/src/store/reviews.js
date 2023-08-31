import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadReviews'

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews
})

export const thunkLoadReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if(response.ok) {
    const data = await response.json();
    dispatch(loadReviews(data));
    return data;
  }
};

const initialState = {
  reviews: {}
}

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_REVIEWS:
    newState = { ...state, reviews: {} }
    action.reviews.Reviews.forEach(review => {
      newState.reviews[review.id] = review
    });
    return newState;
    default:
      return state
  }
}

export default reviewsReducer
