import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"

import Fetcher from "../../../services/Fetcher.js"
import ErrorList from "../ErrorList.js"

const YelpVenueDropDown = ({ map, addNewVenue, user }) => {
  const [yelpVenues, setYelpVenues] = useState([])
  const [selectedId, setSelectedId] = useState("")
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleSelect = (event) => {
    setSelectedId(event.target.value)
    setErrors([])
  }

  const getYelpVenues = async () => {
    const { center, radius } = map
    const url = `/api/v1/yelpVenues/?lat=${center.lat}&lng=${center.lng}&radius=${Math.round(radius)}`

    const response = await Fetcher.get(url)
    if (response.ok) {
      setYelpVenues(response.data.venues)
    }
  }

  const handleClick = () => {
    getYelpVenues()
  }

  useEffect(() => {
    getYelpVenues()
  }, [])

  const getNewVenue = async () => {
    const selectedVenue = yelpVenues.find(venue => venue.id === selectedId)
    delete selectedVenue.id
    const response = await Fetcher.post("api/v1/venues", selectedVenue)
    if (response.ok) {
      return addNewVenue(response.data.venue)
    }
    setErrors(response.validationErrors)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!user) return setShouldRedirect(true)
    if (!selectedId) return

    setSelectedId("")
    setErrors([])
    getNewVenue()
  }

  const options = yelpVenues.map((venue) => {
    return (
      <option key={venue.id} value={venue.id}>{venue.name}</option>
    )
  })

  if (shouldRedirect) {
    return <Redirect push to="/user-sessions/new" />
  }

  return (
    <>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <div className="yelp-add-buttons">
          <label>
            <select value={selectedId} onChange={handleSelect} onClick={handleClick}>
              <option key="emptyValue" value={""}>
                Select from nearby places
              </option>
              {options}
            </select>
          </label>
          <input className = "button" type="submit" value="Submit" />
        </div>
      </form>
    </>
  )
}

export default YelpVenueDropDown
