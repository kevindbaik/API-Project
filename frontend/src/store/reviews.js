import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadReviews';
const CREATE_REVIEW = 'reviews/createReview';
const DELETE_REVIEW = 'reviews/deleteReview';

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews
});

const createReview = (review) => ({
  type: CREATE_REVIEW,
  review
});

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
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
};

export const thunkDeleteReview = (reviewId) => async(dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(deleteReview(reviewId))
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
    case DELETE_REVIEW:
      newState = { ...state, reviews: { ...state.reviews }}
      delete newState.reviews[action.reviewId]
      return newState;
    default:
      return state
  }
}

export default reviewsReducer
