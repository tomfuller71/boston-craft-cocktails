import React, { useState } from "react"

const YelpVenueDropDown = ({ yelpVenues, updateYelpVenue }) => {

  const [selected, setSelected] = useState({ name: "Select from Yelp" })

  const handleSelect = (event) => {
    console.log(event.currentTarget.value)
    setSelected(event.currentTarget.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateYelpVenue(selectedVenue)
  }

  const options = yelpVenues.map((venue) => {
    return (
      <option key={venue.id} value={venue}>{venue.name}</option>
    )
  })

  return (
    <form onSubmit={handleSubmit}>
    <label>
      <select value={selected.name} onChange={handleSelect}>
        {options}
      </select>
    </label>
    <input type="submit" value="Submit" />
  </form>
  )
}

export default YelpVenueDropDown
