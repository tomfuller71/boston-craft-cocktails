import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"

import CocktailTile from "./CocktailTile.js"
import Fetcher from "../../../services/Fetcher.js"

const CocktailIndex = ({ user, location }) => {
  const [cocktails, setCocktails] = useState([])
  const [searchParams, setSearchParams] = useState(new URLSearchParams(location.search))

  useEffect(() => {
    getCocktails()
  }, [searchParams])

  const cocktailList = cocktails.map((cocktail) => {
    return <CocktailTile id={cocktail.id} key={cocktail.id} user={user} {...cocktail} />
  })

  return (
    <div className="cocktail-index">
      {cocktailList}
    </div>
  )

  async function getCocktails() {
    const response = await Fetcher.get(getRoute())
    if (response.ok) {
      return setCocktails(response.data.cocktails)
    }
  }

  function getRoute() {
    let route = "/api/v1/cocktails"
    const search = searchParams.toString()
    if (search) {
      route += `/?${search}`
    }
    return route
  }
}

export default withRouter(CocktailIndex)
