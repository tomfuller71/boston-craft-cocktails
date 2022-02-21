import React, { Component, useState } from "react"
import GoogleMapReact from "google-map-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCocktail } from "@fortawesome/free-solid-svg-icons"

import GoogleMapStyle from "../../assets/GoogleMapStyle.js"

const markers = [
  {lat: 42.353, lng: -71.065, name:"My Marker 1", rating: "5" },
  {lat: 42.354, lng: -71.066, name:"My Marker 2", rating: "4" },
  {lat: 42.355, lng: -71.067, name:"My Marker 3", rating: "3" },
  {lat: 42.356, lng: -71.068, name:"My Marker 4", rating: "2" },
]

const InfoWindow = (props) => {
  const { name, rating } = props;
  const infoWindowStyle = {
    position: 'relative',
    bottom: 150,
    left: '-45px',
    width: 220,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 16,
    zIndex: 100,
  };

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 20 }}>
        {name}
      </div>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: 'grey' }}>
          {rating}
          {' '}
        </span>
        <span style={{ color: 'orange' }}>
          {String.fromCharCode(9733).repeat(Math.floor(rating))}
        </span>
        <span style={{ color: 'lightgrey' }}>
          {String.fromCharCode(9733).repeat(5 - Math.floor(rating))}
        </span>
      </div>
      {/* <div style={{ fontSize: 14, color: 'grey' }}>
        {place.types[0]}
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
        {'$'.repeat(place.price_level)}
      </div>
      <div style={{ fontSize: 14, color: 'green' }}>
        {place.opening_hours.open_now ? 'Open' : 'Closed'}
      </div> */}
    </div>
  );
};

const VenueMarker = ({ showDetail, name, rating }) => {
  return (
    <div>
      <span className="venue-map-icon">
        <FontAwesomeIcon icon={faCocktail}/>
        {showDetail && <InfoWindow name={name} rating={rating}/>}
      </span>
    </div>
  )
}

const VenueMap = (props) => {
  const defaultProps = {
    center: {
      lat: 42.353,
      lng: -71.065,
    },
    zoom: 16,
  }
  const [defaults, setDefaults] = useState(defaultProps)
  const [activeVenueKey, setActiveVenueKey] = useState(null)

  const onEnterMarkerHandler = (key) => {
    if (key !== activeVenueKey) {
      console.log(key)
      return setActiveVenueKey(key)
    }
  }

  const onExitMarkerHandler = (key) => {
    if (key === activeVenueKey) {
      console.log(`Current active key is ${activeVenueKey}`)
      console.log(key)
      return setActiveVenueKey(null)
    }
  }

  const venueMarkers = markers.map((venue, key) => {
    const { lat, lng, name, rating} = venue
    return (
    <VenueMarker
      key={key}
      showDetail={key == activeVenueKey}
      lat={lat}
      lng={lng}
      name={name}
      rating={rating}
    />)
  })

  const setMapStyle = () => {
    return { styles: GoogleMapStyle.mapStyles }
  }
  
  return (
    <div style={{ height: "40vh", width: "40%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ 
          key: "AIzaSyAE2TEG7jrmY-_Gx_8s_1Cg-IjtWTtzwU4",
          map_ids: "5fd11bc84f3b27e2"
        }}
        options={setMapStyle}
        defaultCenter={defaults.center}
        defaultZoom={defaults.zoom}
        onChildClick={(key) => console.log(key, "haha")}
        onChildMouseEnter={onEnterMarkerHandler}
        onChildMouseLeave={onExitMarkerHandler}
      >
        {venueMarkers}
      </GoogleMapReact>
    </div>
  )
}

export default VenueMap
