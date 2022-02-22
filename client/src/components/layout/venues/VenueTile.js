import React from "react"
import { Link } from "react-router-dom"

const VenueTile = ({ venue }) => {
  return (
    <div className="venue-tile grid-x grid-margin-x callout">
      <div className="cell medium-6">
        <Link to={{
          pathname: "/cocktails",
          search: `?venueId=${venue.id}`
        }}>
          {venue.name}
        </Link>
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