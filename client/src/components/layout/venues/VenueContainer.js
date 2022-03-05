import React from "react";

import VenueTile from "./VenueTile.js";

const VenueContainer = ({ venues, handleCocktailSelect }) => {

  const venueList = venues.map((venue) => {
    return  (
      <VenueTile
        key={venue.id}
        venue={venue}
        handleCocktailSelect={handleCocktailSelect}
      />
    )
  })

  return (
    <div className="venues-overflow">
    {venueList}
    </div>
  )
}

export default VenueContainer