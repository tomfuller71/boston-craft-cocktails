import React from "react"

import RatingStars from "./RatingStars.js"

const ReviewTile = ({ reviewText, rating, userName }) => {
  return (
    <div className="review-tile callout">
      <p className="review-text">{reviewText}</p>
      <div className="review-bottom-row grid-x margin -x">
        <span className="review-rating cell small-6">
          <RatingStars rating={rating}/>
        </span>
        <span className="review-user cell small-6 text-right">Reviewer: {userName}</span>
      </div>
    </div>
  )
}

export default ReviewTile
