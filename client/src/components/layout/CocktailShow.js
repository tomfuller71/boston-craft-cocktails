import React, { useEffect, useState } from "react"
import { Link, Redirect, withRouter } from "react-router-dom"

import Fetcher from "../../services/Fetcher.js"
import ReviewIndex from "./ReviewIndex"
import AddReviewForm from "./AddReviewForm"
import RatingStars from "./RatingStars.js"

const CocktailShow = ({ user, match }) => {
  const { id } = match.params

  const [cocktail, setCocktail] = useState({
    id: "",
    name: "",
    image: "",
    ingredients: [],
    venueName: "",
    reviews: [],
    averageRating: 0
  })

  const [addReviewFormErrors, setAddReviewFormErrors] = useState({})
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [redirectSignIn, setRedirectSignIn] = useState(false)

  const getCocktail = async () => {
    const response = await Fetcher.get(`/api/v1/cocktails/${id}`)
    if (response.ok) {
      setCocktail({ ...response.data.cocktail, user })
    }
  }

  useEffect(() => {
    getCocktail()
  }, [])

  const addReview = async (reviewData) => {
    const response = await Fetcher.post(`/api/v1/cocktails/${id}/reviews`, reviewData)

    if (response.ok) {
      const newReviews = [response.data.review, ...cocktail.reviews] 
      setCocktail({...cocktail, reviews: newReviews})
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

  const ingredientsList = cocktail.ingredients.map((ingredient) => {
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
            {cocktail.name} @ {cocktail.venueName}
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
          <div>
            <img src={cocktail.image} />
          </div>
          <div className="cocktail-below-image callout">
            <div>
              <RatingStars rating={Math.round(cocktail.averageRating)} />
            </div>
            <div>
              <span> {cocktail.reviews.length} reviews</span>
            </div>
          </div>
        </div>
        <div className="cell small-4 medium-2 callout cocktail-ingredients">
          <h5 className="text-left">Ingredients:</h5>
          <ul className="vertical menu">{ingredientsList}</ul>
        </div>
        <div className="cell small-12 medium-7 cocktail-reviews">
          {!showReviewForm && <ReviewIndex reviews={cocktail.reviews} />}
          {showReviewForm && (
            <AddReviewForm
              userId={user.id}
              addReview={addReview}
              errors={addReviewFormErrors}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default withRouter(CocktailShow)
