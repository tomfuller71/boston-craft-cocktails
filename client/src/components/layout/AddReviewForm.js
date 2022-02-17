import React, { useState } from "react"

const AddReviewForm = ({ addReview }) => {
  const defaultInput = {
    reviewText: "",
    rating: ""
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
      reviewText: formInput.reviewText.trim(),
      rating: parseInt(formInput.rating)
    }
    addReview(reviewData)
  }

  return (
    <div className="new-review-form">
      <form onSubmit={handleSubmit}>
        <label className="review-text">
          Review:
          <input
            type="text"
            name="reviewText"
            onChange={handleInput}
            value={formInput.reviewText}
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
      </form>
    </div>
  )
}

export default AddReviewForm
