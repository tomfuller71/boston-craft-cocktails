import React, { useEffect, useState } from "react"

import Fetcher from "../../../services/Fetcher.js"
import VenueMap from "./VenueMap.js"
import VenueContainer from "./VenueContainer.js"
import YelpVenueDropDown from "./YelpVenueDropDown.js"
import CocktailSearchSelector from "../cocktails/CocktailSearchSelector.js"
import CocktailTile from "../cocktails/CocktailTile.js"

const VenueIndex = ({ user }) => {
  const [venues, setVenues] = useState([])
  const [venueMap, setVenueMap] = useState(getMapDefaults())
  const [selectedVenue, setSelectedVenue] = useState(null)
  const [filteredVenues, setFilteredVenues] = useState([])
  const [selectedCocktail, setSelectedCocktail] = useState(null)

  const getVenues = async () => {
    const response = await Fetcher.get("/api/v1/venues",)
    if (response.ok) {
      const fetchedVenues = response.data.venues
      
      const initialFilter = filterVenues(fetchedVenues, venueMap.bounds)
      setFilteredVenues(initialFilter)
      setVenues(fetchedVenues)
    }
  }

  const addNewVenue =(newVenue) => {
    setVenues([newVenue, ...venues])
    setFilteredVenues([newVenue, ...filteredVenues])
  }

  const updateMap = (newMap) => {
    const chgRadius = Math.abs(newMap.radius - venueMap.radius)
    const chgCenter = Math.abs(newMap.center.lat - venueMap.center.lat)
                    + Math.abs(newMap.center.lng - venueMap.center.lng)

    const filtered = filterVenues(venues, newMap.bounds)
    setFilteredVenues(filtered)
    setVenueMap(newMap)
  }

  const getCocktail = async (id) => {
    const response = await Fetcher.get(`/api/v1/cocktails/${id}`)
    if (response.ok) {
      setSelectedCocktail(response.data.cocktail)
    }
  }

  const handleAddVenueSelectorClick = () => {
    getYelpVenues(venueMap)
  }

  const handleCocktailSelect = (id) => {
    getCocktail(id)
  }

  useEffect(() => {
    getVenues()
  }, [])

  return (
    <div className="venues-list cell">
      <div className="grid-x grid-margin-x">
        <div className="venue-map-container cell medium-7 callout">
          <div className="grid-y grid-margin-y">
            <VenueMap 
              venues={venues}
              updateMap={updateMap}
              selectedVenue={selectedVenue}
              setSelectedVenue={setSelectedVenue}
            />
            <div className="cell callout">
              <h5>Add new cocktail place</h5>
              <YelpVenueDropDown
                user={user}
                map={venueMap}
                addNewVenue={addNewVenue}
                handleClick={handleAddVenueSelectorClick}
              />
            </div>
          </div>
        </div>
        <div className="venue-list-container cell medium-5 callout">
          <VenueContainer
            venues={filteredVenues}
            handleCocktailSelect={handleCocktailSelect}
          />
          <div className="cocktail-search callout">
            <CocktailSearchSelector
              handleCocktailSelect={handleCocktailSelect}
            />
          </div>
        </div>
        <div className="cell">
          {selectedCocktail && 
            <CocktailTile user={user} {...selectedCocktail} />
          }
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

function filterVenues(venueList, bounds) {
  if (venueList.length === 0) return []
  const filtered =  venueList.filter((venue) => {
    const { lat, lng } = venue
    const { nw , se } = bounds
    const inLat = lat < nw.lat && lat > se.lat
    const inLng = lng > nw.lng && lng < se.lng

    return inLat && inLng
  })
  return filtered
}

export default VenueIndex
