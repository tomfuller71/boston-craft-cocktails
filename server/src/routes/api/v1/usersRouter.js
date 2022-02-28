import express from "express"
import { ValidationError } from "objection"
import passport from "passport"

import { User } from "../../../models/index.js"

const usersRouter = new express.Router()

usersRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body
  try {

    if (password.length < 8) {
      throw new ValidationError({
        type: 'ModelValidation',
        data: { password: [{ message: "Needs to be at least 8 characters" }] },
        statusCode: 400
      })
    }

    const persistedUser = await User.query()
    .insertAndFetch({ name, email, password })

    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser })
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default usersRouter;
