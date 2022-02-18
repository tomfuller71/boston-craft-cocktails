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
      <li  key={venue.id}>
        <Link to={`/cocktails/?venueId=${venue.id}&offset=0&limit=10`} >
          {venue.name}
        </Link>
      </li>
    )
  })

  return (
    <div className="venues-list">
      <h1>Venues</h1>
      <ul>{venueList}</ul>
    </div>
  )
}

export default VenueIndex
