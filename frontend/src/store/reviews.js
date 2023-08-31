import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadReviews'
const CREATE_REVIEW = 'reviews/createReview'

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews
})

const createReview = (review) => ({
  type: CREATE_REVIEW,
  review
})

export const thunkLoadReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if(response.ok) {
    const data = await response.json();
    dispatch(loadReviews(data));
    return data;
  }
};

export const thunkCreateReview = (spotId, review, stars, user) => async(dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({review, stars})
  });

  if(response.ok) {
    let data = await response.json();
    data.User = user;
    dispatch(createReview(data));
    return data;
  }
}

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
    return newState
    case CREATE_REVIEW:
      newState = { ...state, reviews: { ...state.reviews }}
      newState.reviews[action.review.id] = action.review
      return newState;
    default:
      return state
  }
}

export default reviewsReducer
