import React, { useState } from "react"

import ErrorList from "../ErrorList.js"

const AddReviewForm = ({ handleSubmitReview, cancelReview, errors, editableReview }) => {

  const defaultInput = {
    id: editableReview ? editableReview.id : null,
    reviewText: editableReview ? editableReview.reviewText : "",
    rating: editableReview ? editableReview.rating : ""
  }

  const [formInput, setFormInput] = useState(defaultInput)

  const handleInput = (event) => {
    const { name, value } = event.currentTarget
    setFormInput({
      ...formInput,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const reviewData = {
      id: formInput.id,
      reviewText: formInput.reviewText.trim(),
      rating: parseInt(formInput.rating)
    }
    handleSubmitReview(reviewData)
  }

  const handleCancel = (event) => {
    event.preventDefault()
    cancelReview()
  }

  return (
    <div className="new-review-form">
      <form onSubmit={handleSubmit}>
        <label className="review-text">
          Review:
          <textarea
            // type="text"
            name="reviewText"
            onChange={handleInput}
            value={formInput.reviewText}
            rows={3}
            maxLength={255}
          />
        </label>
        <label className="review-rating">
          Rating
          <select name="rating" value={formInput.rating} onChange={handleInput}>
            <option value="" disabled>
              Pick a number
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <input className="button" type="submit" value="Submit" />
        <input 
          className="button"
          type="button"
          value="Cancel"
          onClick={handleCancel}
        />
      </form>
      <ErrorList errors={errors} />
    </div>
  )
}

export default AddReviewForm
