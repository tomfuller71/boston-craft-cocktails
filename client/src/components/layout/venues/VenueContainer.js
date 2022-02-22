import React from "react";

import VenueTile from "./VenueTile";

const VenueContainer = ({ venues }) => {

  const venueList = venues.map((venue) => {
    return  <VenueTile key={venue.id} venue={venue} />
  })

  return (
    <div className="venue-list-container">
      <h5>Craft cocktails @</h5>
    {venueList}
    </div>
  )
}

export default VenueContainer