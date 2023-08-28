import React from 'react'
import './OneSpot.css'

function OneSpot({spot}) {
  return (
    <div className='onespot-container'>
      <div className='onespot-image-container'>
        <img className='onespot-image' src={spot.previewImage} alt=''/>
      </div>
      <div className='onespot-info'>
        <div>
        <h4 className='onespot-location'>{spot.city}, {spot.state}</h4>
        <p>${spot.price} night</p>
        </div>
        <div>
          <p className='onespot-star'>STAR: {spot.avgRating}.0</p>
        </div>
      </div>
    </div>
  )
}

export default OneSpot
