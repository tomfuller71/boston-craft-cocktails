import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Fetcher from "../../services/Fetcher.js"

const VenueIndex = (props) => {
  const [venues, setVenues] = useState([])

  const getVenues = async () => {
    const response = await Fetcher.get("/api/v1/venues")
    if (response.ok) {
      setVenues(response.data.venues)
    }
  }

  useEffect(() => {
    getVenues()
  }, [])

  const venueList = venues.map((venue) => {
    return (
      <div key={venue.id} className="venue-tile grid-x grid-margin-x">
        <div className="cell medium-8">
          <Link to={{
            pathname: "/cocktails",
            search: `?venueId=${venue.id}`
          }}>
            {venue.name}
          </Link>
        </div>
        <div className="cell medium-2">
          <Link to={`/venues/${venue.id}/addCocktail`} >
            Add Cocktail
          </Link>
        </div>
      </div>
    )
  })

  return (
    <div className="venues-list">
      <h1>Venues</h1>
      {venueList}
    </div>
  )
}

export default VenueIndex
