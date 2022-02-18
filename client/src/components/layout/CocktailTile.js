import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"

import ReviewIndex from "./ReviewIndex"
import AddReviewForm from "./AddReviewForm"
import Fetcher from "../../services/Fetcher.js"

const CocktailTile = (props) => {
		const { id, name, image, ingredients, venueName, user } = props
    const [reviews, setReviews] = useState(props.reviews)
    const [addReviewFormErrors, setAddReviewFormErrors] = useState({})
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [redirectSignIn, setRedirectSignIn] = useState(false)

    const addReview = async (reviewData) => {
      const response = await Fetcher.post(`/api/v1/cocktails/${id}/reviews`, reviewData)

      if (response.ok) {
        setReviews([response.data.review, ...reviews])
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
        <div className="cocktail-header grid-x grid-margin-x">
          <div className="cell small-10">
            <h3>
              {name} @ {venueName}
            </h3>
          </div>
          <div className="cell small-2 text-center">
            <button type="button" className="button" onClick={addReviewButtonClickHandler}>
              Add review
            </button>
          </div>
        </div>
        <div className="cocktail-panel grid-x grid-margin-x">
          <div className="cell small-8 medium-3 cocktail-image">
            <img src={image} />
            <div className="cocktail-rating">
              <h5>{props.averageRating}</h5>
            </div>
          </div>
          <div className="cell small-4 medium-2 callout cocktail-ingredients">
            <h5 className="text-left">Ingredients:</h5>
            <ul className="vertical menu">{ingredientsList}</ul>
          </div>
          <div className="cell small-12 medium-7 cocktail-reviews">
            {!showReviewForm && <ReviewIndex reviews={reviews} />}
            {showReviewForm && (
              <AddReviewForm userId={user.id} addReview={addReview} errors={addReviewFormErrors} />
            )}
          </div>
        </div>
      </div>
    )
}

export default CocktailTile