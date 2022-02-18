import express from "express"
import { ValidationError } from "objection"

import { Cocktail, Venue } from "../../../models/index.js"
import CocktailSerializer from "../../../serializers/CocktailSerializer.js"
import cocktailReviewsRouter from "./cocktailReviewsRouter.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

import uploadImage from "../../../services/uploadImage.js"

const cocktailsRouter = new express.Router()

cocktailsRouter.get("/", async (req, res) => {
  const { venueId } = req.query

  try {
    let cocktails = null
    if (venueId) {
      const venue = await Venue.query().findById(venueId)
      cocktails = await venue.$relatedQuery("cocktails")
    } else {
      cocktails = await Cocktail.query()
    }

    const serialized = await CocktailSerializer.serializeCollection(cocktails)

    res.status(200).json({ cocktails: serialized })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

cocktailsRouter.post("/", uploadImage.single("image"), async (req, res) => {
  try {
    if (!req.user) {
      throw new Error("User is not logged in.")
    }

    const { body, file } = req

    const formData =  {
      ...cleanUserInput(body),
      image: file ? file.location : null
    }
    console.log(formData)

    const cocktail = await Cocktail.query().insertAndFetch(formData)
    const serialized = CocktailSerializer.getSummary(cocktail)

    res.status(201).json({ cocktail: serialized })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

cocktailsRouter.use("/:id/reviews", cocktailReviewsRouter)

export default cocktailsRouter