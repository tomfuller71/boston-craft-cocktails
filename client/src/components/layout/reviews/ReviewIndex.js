import React from "react"

import ReviewTile from "./ReviewTile.js"

const ReviewIndex = ({ reviews, user, editReviewButtonClickHandler, deleteReviewHandler }) => {
  const reviewTiles = reviews.map((review) => {
    return (
      <ReviewTile
        key={review.id}
        isEditable={user && user.id === review.userId}
        editReview={editReviewButtonClickHandler}
        deleteReview={deleteReviewHandler}
        review={review}
      />
    )
  })

  return <div className="review-index">{reviewTiles}</div>
}

export default ReviewIndex
