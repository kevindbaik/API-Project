import React, { useState } from 'react'
import './Stars.css'

const Stars = ({ rating, disabled, onChange }) => {
      const [activeRating, setActiveRating] = useState(rating); return (
        <div className="rating-input">
          <div
            className={activeRating >= 1 ? "filled" : "empty"}
            onClick={() => onChange(1)}
            onMouseEnter={(e) => (disabled ? null : setActiveRating(1))}
            onMouseLeave={(e) => (disabled ? null : setActiveRating(rating))}
          >
            <i className={activeRating >= 1 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
          </div>
          <div
            className={activeRating >= 2 ? "filled" : "empty"}
            onClick={() => onChange(2)}
            onMouseEnter={(e) => (disabled ? null : setActiveRating(2))}
            onMouseLeave={(e) => (disabled ? null : setActiveRating(rating))}
          >
             <i className={activeRating >= 2 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
          </div>
          <div
            className={activeRating >= 3 ? "filled" : "empty"}
            onClick={() => onChange(3)}
            onMouseEnter={(e) => (disabled ? null : setActiveRating(3))}
            onMouseLeave={(e) => (disabled ? null : setActiveRating(rating))}
          >
            <i className={activeRating >= 3 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
          </div>
          <div
            className={activeRating >= 4 ? "filled" : "empty"}
            onClick={() => onChange(4)}
            onMouseEnter={(e) => (disabled ? null : setActiveRating(4))}
            onMouseLeave={(e) => (disabled ? null : setActiveRating(rating))}
          >
            <i className={activeRating >= 4 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
          </div>
          <div
            className={activeRating === 5 ? "filled" : "empty"}
            onClick={() => onChange(5)}
            onMouseEnter={(e) => (disabled ? null : setActiveRating(5))}
            onMouseLeave={(e) => (disabled ? null : setActiveRating(rating))}
          >
            <i className={activeRating >= 5 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
          </div>
        </div>
      );
};

export default Stars;
