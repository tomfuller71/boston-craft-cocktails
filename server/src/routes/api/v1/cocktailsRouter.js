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


cocktailsRouter.get("/options", async (req, res) => {
  try {
    const cocktails = await Cocktail.query()
    const options = await CocktailSerializer.getCocktailOptions(cocktails)

    res.status(200).json({ options })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})



cocktailsRouter.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const cocktail = await Cocktail.query().findById(id)
    const serializedCockTail = await CocktailSerializer.getDetail(cocktail)
    res.status(200).json({ cocktail: serializedCockTail })
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: error })
  }
})

cocktailsRouter.post("/", uploadImage.single("image"), async (req, res) => {
  const { body, file } = req
  const formData =  {
    ...cleanUserInput(body),
    cocktailComponents: JSON.parse(body.cocktailComponents),
    image: file ? file.location : null
  }

  try {
    if (!req.user) throw new Error("User is not logged in.")

    const cocktail = await Cocktail.transaction(async transaction => {
        return await Cocktail.query(transaction).insertGraph(formData);
    });

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