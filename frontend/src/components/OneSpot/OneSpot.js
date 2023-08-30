import React from 'react';
import { NavLink } from 'react-router-dom';
import './OneSpot.css';
import 'react-tooltip/dist/react-tooltip.css'
import Tooltip from '../Tooltip/Tooltip';

function OneSpot({spot}) {
  return (
    <div className='onespot-container'>
      <div className='onespot-image-container'>
        <Tooltip content={spot.name} direction='top'>
        <NavLink to={`/spots/${spot.id}`}>
          <img content={spot.name} className='onespot-image' src={spot.previewImage} alt=''/>
        </NavLink>
        </Tooltip>
      </div>
      <div className='onespot-info'>
        <div>
        <h4 className='onespot-location'>{spot.city}, {spot.state}</h4>
        <p className='onespot-price'>${spot.price} night</p>
        </div>
        <div>
          {spot.avgRating >=1 ? <i className="fa-solid fa-star">&nbsp; {spot.avgRating}.0</i> : <p className='onespot-new'>New</p>}
        </div>
      </div>
    </div>
  )
}

export default OneSpot
