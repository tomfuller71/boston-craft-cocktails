import express from "express"

import cocktailsRouter from "./api/v1/cocktailsRouter.js"
import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
import ingredientsRouter from "./api/v1/ingredientsRouter.js"
import venuesRouter from "./api/v1/venuesRouter.js"
import yelpVenuesRouter from "./api/v1/yelpVenues.js"
import reviewsRouter from "./api/v1/reviewsRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/", clientRouter)

rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/cocktails", cocktailsRouter)
rootRouter.use("/api/v1/ingredients", ingredientsRouter)
rootRouter.use("/api/v1/venues", venuesRouter)
rootRouter.use("/api/v1/yelpVenues", yelpVenuesRouter)
rootRouter.use("/api/v1/reviews", reviewsRouter)


export default rootRouter
