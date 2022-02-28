import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGlassMartiniAlt } from "@fortawesome/free-solid-svg-icons"

import RatingStars from "../RatingStars.js"

const VenueTile = ({ venue, handleCocktailSelect }) => {
  const numberCocktails = venue.cocktails.length

  const topRatedCocktail = venue.cocktails.sort((a,b) => {
    return b.averageRating - a.averageRating
  })[0]

  const mostReviewed = venue.cocktails.sort((a,b) => {
    return b.reviews.length - a.reviews.length
  })[0]

  const handleClick = (event) => {    
    event.preventDefault()
    handleCocktailSelect(event.currentTarget.id)
  }

  const topButton = topRatedCocktail 
    ? (
        <button
          className="link-button"
          id={topRatedCocktail.id}
          onClick={handleClick}
        >{topRatedCocktail.name}</button>
    )
    : "-"

    const reviewedButton = mostReviewed
    ? (
        <button
          className="link-button"
          id={mostReviewed.id}
          onClick={handleClick}
        >{mostReviewed.name}</button>
    )
    : "-"
  

  return (
    <div className="venue-tile grid-x grid-margin-x callout">
      <div className="cell auto">
        <Link to={{
          pathname: "venues/cocktails",
          search: `?venueId=${venue.id}`
        }}>
          {venue.name}
        </Link>
        <div className="rating-container">
          <RatingStars rating={venue.rating} />
          <span className="cocktail-count">
            <FontAwesomeIcon icon={faGlassMartiniAlt} /> {numberCocktails}
          </span>
        </div>
        <div className="cocktail-stats">
          <p>Top rated:
             {topButton}
          </p>
          <p>Most reviewed:
             {reviewedButton}
          </p>
        </div>
      </div>
      <div className="cell auto shrink text-right">
        <Link className="button" to={`/venues/${venue.id}/addCocktail`} >
          Add Cocktail
        </Link>
      </div>
    </div>
  )
}

export default VenueTile