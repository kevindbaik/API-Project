import React from 'react';
import OneSpot from '../OneSpot/OneSpot';
import './AllSpots.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkLoadSpots } from '../../store/spots';

function AllSpots() {
  const dispatch = useDispatch();
  const objAllSpots = useSelector(state => state.spots.allSpots);
  const arrAllSpots = Object.values(objAllSpots);


  useEffect(() => {
    dispatch(thunkLoadSpots())
  }, [dispatch]);

  return (
    <div className='allspots-container'>
      {arrAllSpots.map(spot => (
        <OneSpot spot={spot}/>
      ))}
    </div>
  )
}

export default AllSpots
