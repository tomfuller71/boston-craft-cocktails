import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCocktail } from "@fortawesome/free-solid-svg-icons"

import InfoWindow from "./InfoWindow.js"

const Marker = ({ showDetail, name, rating }) => {
  return (
    <div>
      <span className="venue-map-icon">
        <FontAwesomeIcon icon={faCocktail}/>
        {showDetail && <InfoWindow name={name} rating={rating}/>}
      </span>
    </div>
  )
}

export default Marker