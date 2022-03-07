import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons" 
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"

import RatingStars from "../RatingStars.js"

const ReviewTile = ({ review, isEditable, editReview, deleteReview }) => {

  const { reviewText, rating, userName, date } = review

  const handleEditClick = (event) => {
    event.preventDefault()
    editReview(review)
  }

  const handleDeleteClick = (event) => {
    event.preventDefault()
    deleteReview(review.id)
  }

  return (
    <div className="review-tile callout">
      <p className="review-text">{reviewText}</p>
      <div className="review-bottom-row grid-x margin-x align-justify">
        <div className="review-rating cell shrink" >
          <RatingStars rating={rating}/>
          <span className="review-user">{`${userName} ${date}`}</span>
        </div>
        <div
          className="review-data cell shrink"
        >
          {isEditable && 
            <>
              <span onClick={handleEditClick}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </span>
              <span onClick={handleDeleteClick}>
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default ReviewTile
