import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGlassMartiniAlt } from "@fortawesome/free-solid-svg-icons"

import RatingStars from "../RatingStars.js"

const VenueTile = ({ venue }) => {
  const numberCocktails = venue.cocktails.length

  const topRatedCocktail = venue.cocktails.sort((a,b) => {
    return b.averageRating - a.averageRating
  })[0]

  const mostReviewed = venue.cocktails.sort((a,b) => {
    return b.reviews.length - a.reviews.length
  })[0]

  return (
    <div className="venue-tile grid-x grid-margin-x callout">
      <div className="cell medium-6">
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
            {
              topRatedCocktail
              ? <Link to={`/cocktails/${topRatedCocktail.id}`}>
                  {` ${topRatedCocktail.name}`}
                </Link>
              : "-"
            }
          </p>
          <p>Most reviewed:
            {
              mostReviewed
              ? <Link to={`/cocktails/${mostReviewed.id}`} >
                  {` ${mostReviewed.name}`}
                </Link>
              : "-"
            }
          </p>
        </div>
      </div>
      <div className="cell medium-6">
        <Link className="button" to={`/venues/${venue.id}/addCocktail`} >
          Add Cocktail
        </Link>
      </div>
    </div>
  )
}

export default VenueTile