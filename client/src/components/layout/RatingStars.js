import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"


const RatingStars = ( { rating }) => {
  const parsedRating =  parseInt(rating)
  const solidRating = parsedRating ? parsedRating : 0

  let solidStars = []
  for (let solidCount = 0; solidCount < solidRating; solidCount++ ) {
    solidStars.push(
    (<FontAwesomeIcon key={solidCount} icon={fasStar} />)
    )
  }
  let emptyStars = []
  for (let emptyCount = 0; emptyCount < (5 - solidRating); emptyCount++ ) {
    emptyStars.push(
    (<FontAwesomeIcon key={emptyCount} icon={farStar} />)
    )
  }

  return (
    <div className="rating">
      <span className="solid">{solidStars}</span>
      <span className="empty">{emptyStars}</span>
    </div>
  )
}

export default RatingStars