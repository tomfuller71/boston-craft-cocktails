import express from "express"
import fetch, { Headers } from "node-fetch"

import config from "../../../config.js"
import YelpVenueSerializer from "../../../serializers/YelpVenueSerializer.js"

const yelpVenuesRouter = new express.Router()

yelpVenuesRouter.get("/", async (req, res) => {
  const { radius, lat, lng } = req.query
  const key = config.yelpAPI.key
  const url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}&categories=bars&radius=${radius}`

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: new Headers({ 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      })
    })

    const data = await response.json()
    const venues = YelpVenueSerializer.serializeCollection(data.businesses)

    res.status(200).json({ venues })
  } catch (error) {
    console.log(error)
    res.status(500).json({errors: error})
  }
})

export default yelpVenuesRouter