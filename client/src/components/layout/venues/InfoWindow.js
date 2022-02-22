import React from "react"

const InfoWindow = (props) => {
  const { name, rating } = props
  const infoWindowStyle = {
    position: "relative",
    bottom: 150,
    left: "-45px",
    width: 220,
    backgroundColor: "white",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    padding: 10,
    fontSize: 16,
    zIndex: 100,
  }

  //style={infoWindowStyle}
  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 20 }}>{name}</div>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: "grey" }}>{rating} </span>
        <span style={{ color: "orange" }}>
          {String.fromCharCode(9733).repeat(Math.floor(rating))}
        </span>
        <span style={{ color: "lightgrey" }}>
          {String.fromCharCode(9733).repeat(5 - Math.floor(rating))}
        </span>
      </div>
    </div>
  )
}

export default InfoWindow
