import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./OneSpot.css";
import "react-tooltip/dist/react-tooltip.css";
import Tooltip from "../Tooltip/Tooltip";
import DeleteModal from "../DeleteModal/DeleteModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

function OneSpot({ spot }) {
  let manage = false;
  if (window.location.href.endsWith("current")) {
    manage = true;
  }

  return (
    <div className="onespot-container">
      <div className="onespot-image-container">
        <Tooltip content={spot.name} direction="top">
          <NavLink to={`/spots/${spot.id}`}>
            <img
              content={spot.name}
              className="onespot-image"
              src={spot.previewImage}
              alt=""
            />
          </NavLink>
        </Tooltip>
      </div>
      <NavLink
        style={{ textDecoration: "none", color: "black" }}
        to={`/spots/${spot.id}`}
      >
        <div className="onespot-info">
          <div>
            <h4 className="onespot-location">
              {spot.city}, {spot.state}
            </h4>
            <p className="onespot-price">${spot.price} night</p>
          </div>
          <div className="starrating-media">
            {spot.avgRating >= 1 ? (
              <div className="star-rating-container">
                <i className="fa-solid fa-star fa-reviewstar"></i>
                <p>{spot.avgRating.toFixed(2)}</p>
              </div>
            ) : (
              <p className="onespot-new">New</p>
            )}
          </div>
        </div>
      </NavLink>
      {manage && (
        <div className="update-delete-container">
          <NavLink to={`/spots/${spot.id}/edit`}>
            <button className="manage-updatebutton">Update</button>
          </NavLink>
          <OpenModalMenuItem
            itemText="Delete"
            modalComponent={<DeleteModal spot={spot} />}
          />
        </div>
      )}
    </div>
  );
}

export default OneSpot;
