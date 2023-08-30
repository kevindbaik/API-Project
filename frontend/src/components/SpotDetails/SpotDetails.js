import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSpotDetails } from '../../store/spots';
import { useParams } from 'react-router-dom';
import './SpotDetails.css'

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.oneSpot);

  useEffect(() => {
    dispatch(thunkGetSpotDetails(spotId))
  }, [dispatch, spotId]);

  if(!spot || Object.keys(spot).length === 0) return null

  let previewImage = spot.SpotImages.find(image => image.preview)
  const otherImages = spot.SpotImages.filter(image => !image.preview);

  return (
    <div className='spotdetails-container'>
      <h1 className='spotdetails-h1'>{spot.name}</h1>
      <h2 className='spotdetails-h2'>{spot.city}, {spot.state}, {spot.country}</h2>
      <div className='spotdetails-imagesplitter'>
        <img className='spotdetails-previewImage' src={previewImage.url} alt=''></img>
        <div className='spotdetails-sideImages-container'>
          {otherImages.map((image, index) => (
            <img id={index === 1 && "topright" || index === 3 && "bottomright"} className='spotdetails-sideImages' src={image.url} alt=''></img>
          ))}
        </div>
      </div>
      <div className='spotdetails-host'>Treehome hosted by:
        <p className='spotdetails-hostname'>&nbsp;{spot.Owner.firstName} {spot.Owner.lastName}</p>
      </div>
      <div className='spotdetails-information-container'>
        <div className='spotdetails-description'>
          <p>{spot.description}</p>
          <p className='spotdetails-descriptionlink'>Show more </p>
        </div>
        <div className='spotdetails-reservebox'>
          <div className='spotdetails-reservetop'>
            <p className='spotdetails-price'>${spot.price} night</p>
            <div className='starreviews'>
            <i className="fa-solid fa-star"></i>
            <p className='spotdetails-numstars'>&nbsp; {spot.avgStarRating}.0</p>
            <p className='dot'>•</p>
            <p className='spotdetails-numreviews'>{spot.numReviews} reviews</p>
            </div>
          </div>
          <button onClick={() => {alert('Feature coming soon!')}} className='reserve-button'>Reserve</button>
        </div>
      </div>
    </div>
  )
}

export default SpotDetails
