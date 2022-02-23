import React, { useEffect, useState } from "react"

import Fetcher from "../../../services/Fetcher.js"
import VenueMap from "./VenueMap.js"
import VenueContainer from "./VenueContainer.js"
import YelpVenueDropDown from "./YelpVenueDropDown.js"

const VenueIndex = ({ user }) => {
  const [venues, setVenues] = useState([])
  const [venueMap, setVenueMap] = useState(getMapDefaults())
  const [selectedVenue, setSelectedVenue] = useState(null)
  const [yelpVenues, setYelpVenues] = useState([])

  const getVenues = async () => {
    const response = await Fetcher.get("/api/v1/venues",)
    if (response.ok) {
      setVenues(response.data.venues)
    }
  }

  const getYelpVenues = async () => {
    const { center, radius } = venueMap
    const url = `/api/v1/yelpVenues/?lat=${center.lat}&lng=${center.lng}&radius=${Math.round(radius)}`

    const response = await Fetcher.get(url)
    if (response.ok) {
      setYelpVenues(response.data.venues)
    }
  }

  const addNewVenue =(newVenue) => {
    setVenues([...venues, newVenue])
  }

  const updateMap = (newMap) => {
    const chgRadius = Math.abs(newMap.radius - venueMap.radius)
    const chgCenter = Math.abs(newMap.center.lat - venueMap.center.lat)
                    + Math.abs(newMap.center.lng - venueMap.center.lng)

    if (chgCenter > 0.005 || chgRadius > 50) {
      getYelpVenues()
    }
    setVenueMap(newMap)
  }

  useEffect(() => {
    getVenues()
    getYelpVenues()
  }, [])

  return (
    <div className="venues-list cell callout">
      <div className="grid-x grid-margin-x">
        <div className="cell medium-7 callout">
          <div className="grid-y grid-margin-y">
            <div className="cell">
              <VenueMap 
                venues={ venues }
                updateMap={updateMap}
                selectedVenue={selectedVenue}
                setSelectedVenue={setSelectedVenue}
              />
            </div>
            <div className="cell callout">
              <h5>Add new cocktail place</h5>
              <YelpVenueDropDown
                user={user}
                yelpVenues={yelpVenues}
                addNewVenue={addNewVenue}
              />
            </div>
          </div>
        </div>
        <div className="cell medium-5 callout">
          <VenueContainer venues={venues} />
        </div>
      </div>
    </div>
  )
}

function getMapDefaults() {
  return {
    center: {lat: 42.356, lng: -71.060},
    bounds: {
      nw: {
        lat: 42.384,
        lng: -71.100
      },
      se: {
        lat: 42.329,
        lng: -71.020
      }
    },
    radius: 3000
  }
 }

export default VenueIndex
