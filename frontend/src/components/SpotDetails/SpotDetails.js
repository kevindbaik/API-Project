import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSpotDetails } from '../../store/spots';
import { useParams } from 'react-router-dom';
import './SpotDetails.css'

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.oneSpot);

  let previewImage = {};
  spot?.SpotImages.forEach(image => {
    if(image.preview) previewImage = image
  });


  let otherImages = spot?.SpotImages.filter(image => !image.preview);
  console.log(otherImages)

  useEffect(() => {
    dispatch(thunkGetSpotDetails(spotId))
  }, [dispatch, spotId]);
  return (
    <div className='spotdetails-container'>
      <h1>{spot?.name}</h1>
      <h2 className='spotdetails-h2'>{spot?.city}, {spot?.state}, {spot?.country}</h2>
      <div className='spotdetails-imagesplitter'>
        <img className='spotdetails-previewImage' src={previewImage.url}></img>
        <div className='spotdetails-sideImages-container'>
          {otherImages?.length && otherImages.map(image => (
            <img className='spotdetails-sideImages' src={image.url}></img>
            // console.log(image.url)
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpotDetails
