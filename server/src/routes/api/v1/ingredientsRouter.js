import express from "express"

import IngredientSerializer from "../../../serializers/IngredientSerializer.js"
import { Ingredient } from "../../../models/index.js"

const ingredientsRouter = new express.Router()

ingredientsRouter.get("/",  async (req, res) => {
    try {
        const ingredientsData = await Ingredient.query()
        const ingredients = IngredientSerializer.serializeCollection(ingredientsData)

        res.status(200).json({ ingredients })
    } catch (error) {
        res.status(500).json({errors: error})
    }
})

ingredientsRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const ingredientData = await Ingredient.query().findById(id)
        const ingredient = IngredientSerializer.getDetail(ingredientData)
        res.status(200).json({ ingredient })
    } catch (error) {
        console.log(`Could not find ingredient id${id}`)
        res.status(500).json({errors: error})
    }
})

export default ingredientsRouter