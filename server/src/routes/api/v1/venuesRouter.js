import express from "express"
import { ValidationError } from "objection"

import { Venue } from "../../../models/index.js"
import VenueSerializer from "../../../serializers/VenueSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const venuesRouter = new express.Router()

venuesRouter.get("/", async (req, res) => {
  try {
    const venues = await Venue.query()
    const serializedVenues = await VenueSerializer.serializeCollection(venues)
    res.status(200).json({ venues: serializedVenues })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

venuesRouter.post("/", async (req, res) => {
  try {
    if (!req.user) {
      throw new Error("User is not logged in.")
    }

    const { body } = req
    const formData =  {
      ...cleanUserInput(body),
    }

    const venue = await Venue.query().insertAndFetch(formData)
    const serialized = await VenueSerializer.getDetail(venue)

    res.status(201).json({ venue: serialized })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

export default venuesRouter
