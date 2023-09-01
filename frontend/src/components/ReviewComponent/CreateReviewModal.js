import React, { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal';
import Stars from '../Stars/Stars';
import { useDispatch } from 'react-redux';
import { thunkCreateReview } from '../../store/reviews';
import { thunkGetSpotDetails } from '../../store/spots';
import './CreateReviewModal.css'

function CreateReviewModal({reviews, spot, user}) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const newReview = await dispatch(thunkCreateReview(spot.id, review, rating, user))
    if(newReview) {
      dispatch(thunkGetSpotDetails(spot.id));
    }
    closeModal();
  };

  const onChange = (number) => {
    setRating(parseInt(number));
  };

  return (
    <div className='createreview-container'>
      <h2>How was your stay?</h2>
      <form onSubmit={handleReviewSubmit}>

      <div className='createreview-starscontainer'>
      <Stars disabled={false}
        onChange={onChange}
        rating={rating} onSubmit={rating}/>
        <p>Stars</p>
        </div>

      <textarea className='createreview-description' value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder='Leave your review here...'/>
      <button type='submit' id='createreview-submitbutton' className='modal-button' disabled={review.length < 10 || rating <= 0}> Submit Your Review </button>
      </form>
    </div>
  )
}

export default CreateReviewModal
