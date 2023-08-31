import React from 'react'
import './ReviewComponent.css'

function ReviewComponent({spot}, {user}) {
  const checkReviews = (reviews) => {
    if(reviews === 0) return 'New'
    else if (reviews === 1) return `${reviews} Review`
    else return `${reviews} Reviews`
  };

  return (
    <div>
      <div className='reviews-header'>
        <i className="fa-solid fa-star"></i>
        {spot.avgStarRating > 0 ? <p className='review-avgstars'>{spot.avgStarRating.toFixed(2)}</p> : null}
        {spot.numReviews > 0 ? <p className='reviews-dot'>·</p> : null}
        <p className={spot.numReviews > 0 ? 'reviews-reviewtext' : 'reviews-newtext'}>{checkReviews(spot.numReviews)}</p>
      </div>
    </div>
  )
}

export default ReviewComponent
