import React from "react"

import ReviewTile from "./ReviewTile"

const ReviewIndex = ({ reviews }) => {
  const reviewTiles = reviews.map((review) => {
    return <ReviewTile key={review.id} {...review} />
  })

  return <div className="review-index">{reviewTiles}</div>
}

export default ReviewIndex
