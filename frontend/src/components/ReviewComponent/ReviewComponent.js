import React from 'react'
import './ReviewComponent.css';
import { useState } from 'react';
import CreateReviewModal from './CreateReviewModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

function ReviewComponent({spot, reviews, user}) {
  const arrReviews = Object.values(reviews);
  let userId;
  if(user) userId = user.id
  // check if reviewed
  let haveReviewed = true;
  if(!arrReviews.find(review => review.userId === userId)) {
    haveReviewed = false;
  }
  // check if owner
  let isOwner = true;
  if(userId !== spot.Owner.id) isOwner = false

  const checkReviews = (reviews) => {
    if(reviews === 0) return 'New'
    else if (reviews === 1) return `${reviews} Review`
    else return `${reviews} Reviews`
  };

  const getEasierDate = (array) => {
    let mostRecent = [];
    for(let i = 0; i < array.length; i++) {
      let review = array[i];
      const date = review.updatedAt;
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
      const betterDate = new Date(date);
      const fullMonth = monthNames[betterDate.getMonth()];
      const fullYear = betterDate.getFullYear();
      review.reviewDate = `${fullMonth} ${fullYear}`;
      // for jsx map to get most recent first
      mostRecent.unshift(review)
    }
    return mostRecent;
  };

  const mostRecent = getEasierDate(arrReviews);
  return (
    <div>
      <div className='reviews-header'>
        <i className="fa-solid fa-star fa-reviewstar"></i>
        {spot.avgStarRating > 0 ? <p className='review-avgstars'>{spot.avgStarRating.toFixed(2)}</p> : null}
        {spot.numReviews > 0 ? <p className='reviews-dot'>·</p> : null}
        <p className={spot.numReviews > 0 ? 'reviews-reviewtext' : 'reviews-newtext'}>{checkReviews(spot.numReviews)}</p>
      </div>

        {arrReviews.length === 0 && userId !== spot.Owner.id ? <p className='first-reviewer'>Be the first to review!</p> : null}

        {!haveReviewed && !isOwner && user ?
          <OpenModalMenuItem
          itemText='Post Your Review'
          modalComponent={<CreateReviewModal reviews={reviews} spot={spot} user={user}/>}
          />
         : null}

      <div className='review-totalcontainer'>
        {mostRecent.map((review) => (
          <div className='review-individualcontainer'>
            <div className='review-picdatename'>
            <img className='review-profilepic' src='https://www.svgrepo.com/show/335455/profile-default.svg'/>
            <div className='review-namedate'>
            <h3>{review.User.firstName}</h3>
            <p>{review.reviewDate}</p>
            </div>
            </div>
            <div className='review-description'>
              {review.review}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewComponent
