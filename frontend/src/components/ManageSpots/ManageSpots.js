import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkLoadUserSpots } from '../../store/spots';
import OneSpot from '../OneSpot/OneSpot';
import '../AllSpots/AllSpots.css';
import './ManageSpots.css'

function ManageSpots() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const objUserSpots = useSelector(state => state.spots.allSpots);
  const arrUserSpots = Object.values(objUserSpots);
  let noSpots = false;

  useEffect(() => {
    dispatch(thunkLoadUserSpots())
  }, [dispatch]);

  if(!user) history.push('/');

  if(Object.keys(objUserSpots).length === 0) {
    noSpots = true;
  };

 const handleCreate = () => {
    const path = '/spots/new';
    history.push(path);
  };

  return (
    <div>
      <div className='manage-header'>
      <h1>Manage Your Spots</h1>
      {noSpots && <button className='manage-createbutton' onClick={handleCreate}>Create a New Spot</button>}
      </div>

      <div className='allspots-container managespots-container'>
        {arrUserSpots.map(spot => (<OneSpot spot={spot}/>))}
      </div>
    </div>

  )
}

export default ManageSpots
