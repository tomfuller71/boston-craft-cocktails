import express from "express"
import { ValidationError } from "objection"

import { Cocktail } from "../../../models/index.js"
import ReviewSerializer from "../../../serializers/ReviewSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const cocktailReviewsRouter = new express.Router({ mergeParams: true })

cocktailReviewsRouter.post("/", async (req, res) => {
  try {
    if (!req.user) {
      throw new Error("No user signed in")
    }

    const reviewData = {
      ...cleanUserInput(req.body),
      userId: req.user.id,
      cocktailId: req.params.id,
    }

    const cocktail = await Cocktail.query().findById(reviewData.cocktailId)

    const review = await cocktail
    .$relatedQuery("reviews")
    .insertAndFetch(reviewData)

    const serializedReview = await ReviewSerializer.getDetail(review)

    res.status(201).json({ review: serializedReview })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      console.log(error)
      return res.status(500).json({ errors: error })
    }
  }
})

export default cocktailReviewsRouter
