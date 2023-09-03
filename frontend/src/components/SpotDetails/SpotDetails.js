import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetSpotDetails } from "../../store/spots";
import { useParams } from "react-router-dom";
import ReviewComponent from "../ReviewComponent/ReviewComponent";
import "./SpotDetails.css";
import { thunkLoadReviews } from "../../store/reviews";

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots.oneSpot);
  const objReviews = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    dispatch(thunkGetSpotDetails(spotId));
    dispatch(thunkLoadReviews(spotId));
  }, [dispatch, spotId]);

  if (!spot || Object.keys(spot).length === 0) return null;

  const previewImage = spot.SpotImages.find((image) => image.preview);
  let otherImages = spot.SpotImages.filter((image) => !image.preview);
  if(otherImages.length < 4) {
    let index = otherImages.length;
    const noImage = { url: 'https://cdn11.bigcommerce.com/s-m1jiibmpmc/stencil/080443d0-e8e7-0139-b5bb-5eca3f67671f/e/f51774b0-60cc-0138-751f-0242ac11000b/icons/icon-no-image.svg'}
    while(index < 4) {
      otherImages[index] = noImage
      index++
    }
  }



  const checkReviews = (reviews) => {
    if (reviews === 0) return "New";
    else if (reviews === 1) return `${reviews} Review`;
    else return `${reviews} Reviews`;
  };

  return (
    <div id='spotdetails-wrapper'>
    <div className="spotdetails-container">
      <h1 className="spotdetails-h1">{spot.name}</h1>
      <h2 className="spotdetails-h2">
        {spot.city}, {spot.state}, {spot.country}
      </h2>
      <div className="spotdetails-imagesplitter">
        <img
          className="spotdetails-previewImage"
          src={Object.keys(previewImage).length > 0 && previewImage.url}
          alt=""
        ></img>
        <div className="spotdetails-sideImages-container">
          {otherImages.map((image, index) => (
            <img
              id={(index === 1 && "topright") || (index === 3 && "bottomright")}
              className="spotdetails-sideImages"
              src={image.url}
              alt=""
            ></img>
          ))}
        </div>
      </div>
      <div className="spotdetails-host">
        Hosted by:
        <p className="spotdetails-hostname">
          &nbsp;{spot.Owner.firstName} {spot.Owner.lastName}
        </p>
      </div>
      <div className="spotdetails-information-container">
        <div className="spotdetails-description">
          <p>{spot.description}</p>
          <p className="spotdetails-descriptionlink">Show more </p>
        </div>
        <div className="spotdetails-reservebox">
          <div className="spotdetails-reservetop">
            <p className="spotdetails-price">
              <strong>${spot.price}</strong> night
            </p>
            <div className="starreviews">
              <i className={spot.numReviews > 0 ? "fa-solid fa-star fa-reviewstar" : "fa-regular fa-star fa-reviewstar"}></i>
              {spot.avgStarRating ? (
                <p className="spotdetails-numstars">
                  &nbsp;{spot.avgStarRating.toFixed(2)}
                </p>
              ) : null}
              {spot.numReviews > 0 ? <p className="reviews-dot">·</p> : null}
              <p
                className={
                  spot.numReviews > 0
                    ? "spotdetails-reviewtext"
                    : "spotdetails-newtext"
                }
              >
                {checkReviews(spot.numReviews)}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              alert("Feature coming soon!");
            }}
            className="reserve-button"
          >
            Reserve
          </button>
        </div>
      </div>

      <div>
        <ReviewComponent spot={spot} user={user} reviews={objReviews} />
      </div>
    </div>
    </div>
  );
}

export default SpotDetails;
