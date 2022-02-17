import React from "react"

const ReviewTile = ({ reviewText, rating, userName }) => {
  return (
    <div className="review-tile callout">
      <p className="review-text">{reviewText}</p>
      <div className="review-bottom-row grid-x margin -x">
        <span className="review-rating cell small-6">Rating: {rating}</span>
        <span className="review-user cell small-6 text-right">Reviewer: {userName}</span>
      </div>
    </div>
  )
}

export default ReviewTile
