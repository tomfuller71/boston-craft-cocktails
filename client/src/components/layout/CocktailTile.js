import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"

import ReviewIndex from "./ReviewIndex"
import AddReviewForm from "./AddReviewForm"
import Fetcher from "../../services/Fetcher.js"
import RatingStars from "./RatingStars.js"

const CocktailTile = (props) => {
		const { id, name, image, ingredients, venueName, user, reviews } = props
    const [reviewsData, setReviews] = useState(reviews)
    const [averageRating, setAverageRating] = useState(props.averageRating)
    const [reviewsCount, setReviewsCount] = useState(reviews.length)
    
    const [addReviewFormErrors, setAddReviewFormErrors] = useState({})
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [redirectSignIn, setRedirectSignIn] = useState(false)

    const addReview = async (review) => {
      const response = await Fetcher.post(`/api/v1/cocktails/${id}/reviews`, review)

      if (response.ok) {
        const newCount = (reviewsCount + 1)
        const newAvg = averageRating * reviewsCount + review.rating / newCount

        setReviews([response.data.review, ...reviewsData])
        setAverageRating(newAvg)
        setReviewsCount(newCount)
        
        return setShowReviewForm(false)
      }
      setAddReviewFormErrors(response.validationErrors)
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
                <RatingStars rating={Math.round(averageRating)} />
              </div>
              <div>
                <span> {reviewsCount} reviews</span>
              </div>
            </div>
          </div>
          <div className="cell small-4 medium-shrink callout cocktail-ingredients">
            <h5>Ingredients:</h5>
            <ul className="ingredient-list vertical menu">{ingredientsList}</ul>
          </div>
          <div className="cell small-12 medium-auto cocktail-reviews">
            {!showReviewForm && <ReviewIndex reviews={reviewsData} />}
            {showReviewForm && (
              <AddReviewForm userId={user.id} addReview={addReview} errors={addReviewFormErrors} />
            )}
          </div>
        </div>
      </div>
    )
}

export default CocktailTile