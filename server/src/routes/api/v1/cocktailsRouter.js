import express from "express"

import { Cocktail } from "../../../models/index.js"
import CocktailSerializer from "../../../serializers/CocktailSerializer.js"
import cocktailReviewsRouter from "./cocktailReviewsRouter.js"

const cocktailsRouter = new express.Router()

cocktailsRouter.get("/", async (req, res) => {
    try {
        const cocktails = await Cocktail.query()
        const serialized = await CocktailSerializer.serializeCollection(cocktails)
        
        res.status(200).json({ cocktails: serialized })
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: error })
    }
})

cocktailsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const cocktail = await Cocktail.query().findById(id)
        const serialized = await CocktailSerializer.getDetail(cocktail) 
        
        res.status(200).json({ cocktail: serialized })
    } catch (error) {
        res.status(500).json({ errors: error })
    }
})

cocktailsRouter.use("/:id/review", cocktailReviewsRouter)

export default cocktailsRouter