import express from "express"
import { ValidationError } from "objection"

import { Review } from "../../../models/index.js"
import ReviewSerializer from "../../../serializers/ReviewSerializer.js"

const reviewsRouter = new express.Router()

reviewsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params
  const { body } = req

  try {
    const updatedReview = await Review.query().patchAndFetchById(id, body)
    const serializedReview = await ReviewSerializer.getDetail(updatedReview)

    res.status(201).json({ review: serializedReview })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({errors: error.data})
    }
    res.status(500).json({ errors: error })
  }
})

reviewsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    await Review.query().deleteById(id)
    res.status(204).send()
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({errors: error.data})
    }
    res.status(500).json({ errors: error })
  }
})

export default reviewsRouter