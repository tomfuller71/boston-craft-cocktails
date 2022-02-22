import React, { useState } from "react"
import GoogleMapReact, { fitBounds } from "google-map-react"
import haversine from 'haversine-distance'

import GoogleMapStyle from "../../../assets/GoogleMapStyle.js"
import Marker from "./Marker.js"

const map = getDefaultProps()

const VenueMap = ({ venues, updateMap, selectedVenue, setSelectedVenue }) => {
  const [hoverVenueId, setHoverVenueId] = useState(null)

  const onEnterMarkerHandler = (key) => {
    if (key !== hoverVenueId) {
      return setHoverVenueId(key)
    }
  }

  const onExitMarkerHandler = (key) => {
    if (key === hoverVenueId) {
      return setHoverVenueId(null)
    }
  }

  const handleMapChange =( newMap ) => {
    const { center, bounds } = newMap
    const radius = haversine(center, bounds.nw) / 1.81
    updateMap({ bounds, radius, center })
  }

  const handleMarkerClick = (key) => {
    if(key === selectedVenue) {
      return setSelectedVenue(null)
    }
    setSelectedVenue(key)
  }

  const markers = venues.map((venue) => {
    const { lat, lng, name, rating, id} = venue
    return (
    <Marker
      key={id}
      showDetail={id == hoverVenueId}
      lat={lat}
      lng={lng}
      name={name}
      rating={rating}
    />)
  })
  //style={map.size}
  return (
    <div className="map-size">
      <GoogleMapReact
        bootstrapURLKeys={{ 
          key: "AIzaSyAE2TEG7jrmY-_Gx_8s_1Cg-IjtWTtzwU4",
          map_ids: "5fd11bc84f3b27e2"
        }}
        options={setMapStyle}
        defaultCenter={map.center}
        defaultZoom={map.zoom}
        onChildClick={handleMarkerClick}
        onChildMouseEnter={onEnterMarkerHandler}
        onChildMouseLeave={onExitMarkerHandler}
        onChange={handleMapChange}
      >
        {markers}
      </GoogleMapReact>
    </div>
  )
}

function getDefaultProps() {
  return {
    center: {lat: 42.356, lng: -71.060},
    zoom: 13,
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
    radius: 3100,
    size: { height: 480, width: 620 }
  }
}

function setMapStyle(){
  return {
    panControl: false,
    mapTypeControl: false,
    disableDefaultUI: true,
    scrollwheel: true,
    zoomControl: true,
    styles: GoogleMapStyle.mapStyles
  }
}

export default VenueMap
