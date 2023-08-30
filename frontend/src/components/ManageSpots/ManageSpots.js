import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkLoadUserSpots } from '../../store/spots';
import OneSpot from '../OneSpot/OneSpot';
import '../AllSpots/AllSpots.css';

function ManageSpots() {
  const dispatch = useDispatch();
  const history = useHistory();
  const objUserSpots = useSelector(state => state.spots.allSpots);
  const arrUserSpots = Object.values(objUserSpots);
  let noSpots = false;

  useEffect(() => {
    dispatch(thunkLoadUserSpots())
  }, [dispatch]);

  if(Object.keys(objUserSpots).length === 0) {
    noSpots = true;
  };

 const handleCreate = () => {
    const path = '/spots/new';
    history.push(path);
  }

  return (
    <div>
      <h1>Manage Your Spots</h1>
      {noSpots && <button onClick={handleCreate}>Create a New Spot</button>}

      <div className='allspots-container'>
        {arrUserSpots.map(spot => (<OneSpot spot={spot}/>))}
      </div>
    </div>

  )
}

export default ManageSpots
