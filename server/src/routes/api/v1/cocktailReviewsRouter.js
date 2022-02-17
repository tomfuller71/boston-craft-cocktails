import express from "express"
import { ValidationError } from "objection"

import { Cocktail } from "../../../models/index.js"
import ReviewSerializer from "../../../serializers/ReviewSerializer.js"
import cleanUserInput from "../../services/cleanUserInput.js"

const cocktailReviewsRouter = new express.Router({ mergeParams: true })

cocktailReviewsRouter.post("/", async (req, res) => {
  const { id } = req.params
  const reviewData = {
    ...cleanUserInput(req.body),
    userId: req.user.id,
    cocktailId: id,
  }

  try {
    const cocktail = await Cocktail.query().findById(id)
    const review = await cocktail.$relatedQuery("reviews").insertAndFetch(reviewData)

    const serializedReview = await ReviewSerializer.getDetail(review)

    res.status(200).json({ review: serializedReview })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

export default cocktailReviewsRouter
