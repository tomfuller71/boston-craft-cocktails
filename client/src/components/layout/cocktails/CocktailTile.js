import React, { useEffect, useState } from "react"
import { Link, Redirect } from "react-router-dom"

import ReviewIndex from "../reviews/ReviewIndex.js"
import AddReviewForm from "../reviews/AddReviewForm.js"
import Fetcher from "../../../services/Fetcher.js"
import RatingStars from "../RatingStars.js"

const CocktailTile = (
  { id, name, image, ingredients, venueName, user, reviews, averageRating }
  ) => {

    const [reviewsData, setReviewsData] = useState({
      reviews,
      averageRating,
      count: reviews.length
    })
    
    const [addReviewFormErrors, setAddReviewFormErrors] = useState({})
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [editingReview, setEditingReview] = useState(null)
    const [redirectSignIn, setRedirectSignIn] = useState(false)


    useEffect(() => {
      setReviewsData({
        reviews,
        averageRating,
        count: reviews.length
      })
    }, [reviews])

    const addReview = async (review) => {
      const response = await Fetcher.post(`/api/v1/cocktails/${id}/reviews`, review)

      if (response.ok) {
        const newCount = (reviewsData.count + 1)
        const newAvg = (reviewsData.averageRating * reviewsData.count + review.rating) / newCount

        setReviewsData({
          reviews: [response.data.review, ...reviewsData.reviews],
          averageRating: newAvg,
          count: newCount
        })
        return setShowReviewForm(false)
      }
      setAddReviewFormErrors(response.validationErrors)
    }

    const patchReview = async (id, patch, newAvg) => {
      const response = await Fetcher.post(
        `/api/v1/reviews/${id}`,
        patch,
        { method: "PATCH" }
      )

      if (response.ok) {
        const updatedReview = response.data.review
        const index = reviewsData.reviews.findIndex(e => e.id === id)
        const otherReviews = [...reviewsData.reviews]
        otherReviews.splice(index, 1)

        setReviewsData({
          reviews: [updatedReview, ...otherReviews],
          averageRating: newAvg,
          count: reviewsData.count
        })
      }
    }

    const editReview = (review) => {
      const { isChanged, newAvg, patch } = getEditReviewUpdate(
        review,
        editingReview,
        reviewsData
      )

      if (isChanged) {
        patchReview(review.id, patch, newAvg)
      }

      setEditingReview(null)
      setShowReviewForm(false)
    }

    const cancelReview = () => {
      setShowReviewForm(false)
    }

    const deleteReview = async (id) => {
      const newReviewData = getDeleteReviewUpdate(reviewsData, id)
      if (newReviewData) {
        setReviewsData(newReviewData)
        await fetch(`/api/v1/reviews/${id}`, { method: "DELETE" })
      }
    }

    const handleDeleteClick = (id) => {
      deleteReview(id)
    }

    const handleSubmitReview = (review) => {
      if (review.id !== null) {
        return editReview(review)
      }
      delete review.id
      addReview(review)
    }

    const editReviewButtonClickHandler = (review) => {
      setEditingReview(review)
      setShowReviewForm(true)
    }

    const addReviewButtonClickHandler = () => {
      if (!user) {
        return setRedirectSignIn(true)
      }
      setShowReviewForm(true)
    }


    const ingredientsList = ingredients.map((ingredient) => {
      return (
        <li key={ingredient.id}>
          <Link to={`/ingredients/${ingredient.id}`}>{ingredient.name}</Link>
        </li>
      )
    })

    if (redirectSignIn) {
      return (
        <Redirect
          push
          to={{
            pathname: "/user-sessions/new",
            state: { referrer: "/cocktails" },
          }}
        />
      )
    }

    return (
      <div className="cocktail-tile callout cell">
        <div className="cocktail-header grid-x grid-margin-x align-justify">
          <div className="cell auto">
            <h3>
              {name} @ {venueName}
            </h3>
          </div>
          <div className="cell auto text-right add-review-button">
            <button type="button" className="button" onClick={addReviewButtonClickHandler}>
              Add review
            </button>
          </div>
        </div>
        <div className="cocktail-panel grid-x grid-margin-x">
          <div className="cell small-8 medium-shrink cocktail-image">
            <div>
              <img src={image} />
            </div>
            <div className="cocktail-below-image callout">
              <div>
                <RatingStars rating={Math.round(reviewsData.averageRating)} />
              </div>
              <div>
                <span> {reviewsData.count} reviews</span>
              </div>
            </div>
          </div>
          <div className="cell small-auto medium-shrink callout cocktail-ingredients">
            <h5>Ingredients:</h5>
            <ul className="ingredient-list vertical menu">{ingredientsList}</ul>
          </div>
          <div className="cell small-12 medium-auto cocktail-reviews">
            {!showReviewForm
              && <ReviewIndex
                  reviews={reviewsData.reviews}
                  user={user}
                  editReviewButtonClickHandler={editReviewButtonClickHandler}
                  deleteReviewHandler = {handleDeleteClick}
                />
            }
            {showReviewForm && (
              <AddReviewForm
                userId={user.id}
                editableReview={editingReview}
                handleSubmitReview={handleSubmitReview}
                cancelReview={cancelReview}
                errors={addReviewFormErrors}
              />
            )}
          </div>
        </div>
      </div>
    )
}

export default CocktailTile

function getEditReviewUpdate(review, editingReview, reviewsData) {
  const { averageRating: oldAvgRating, count } = reviewsData
  const deltaRating = review.rating - editingReview.rating
  const textChanged = review.reviewText !== editingReview.reviewText
  const isChanged = deltaRating !== 0 || textChanged

  let patch = {}
  if (deltaRating !== 0) {
    patch.rating = review.rating
  }
  
  if (textChanged) {
    patch.reviewText = review.reviewText
  }

  const newAvg = (oldAvgRating * count + deltaRating) / count

  return { isChanged, newAvg, patch }
}

function getDeleteReviewUpdate(oldData, id) {
  const {
    reviews: oldReviews,
    averageRating: oldAvgRating,
    count: oldCount
  } = oldData

  const index = oldReviews.findIndex(e => e.id === id)
  if (index > -1) {
    const rating = oldReviews[index].rating
    const newCount = oldCount - 1
    const newAvg = ((oldAvgRating * oldCount) - rating ) / newCount
    const newReviews = [...oldReviews]
    newReviews.splice(index, 1)

    return {
      reviews: newReviews,
      averageRating: newAvg,
      count: newCount
    }
  }
  return null
}