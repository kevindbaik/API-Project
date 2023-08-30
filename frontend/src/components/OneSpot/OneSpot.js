import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './OneSpot.css';
import 'react-tooltip/dist/react-tooltip.css'
import Tooltip from '../Tooltip/Tooltip';
import DeleteModal from '../DeleteModal/DeleteModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

function OneSpot({spot}) {
  let manage = false;
  if (window.location.href.endsWith("current")) {
    manage = true;
  };

  useEffect(() => {

  }, [spot])
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
        {manage &&
        <div className='update-delete-container'>
          <NavLink to={`/spots/${spot.id}/edit`}>
          <button>Update</button>
          </NavLink>
          <OpenModalMenuItem
          itemText='Delete'
          modalComponent={<DeleteModal spot={spot}/>}/>
        </div>
        }
    </div>
  )
}

export default OneSpot
