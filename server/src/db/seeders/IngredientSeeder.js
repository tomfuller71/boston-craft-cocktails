import fetch from "node-fetch"

import { Ingredient } from "../../models/index.js"

class IngredientSeeder {
  static async seed() {
    const key = process.env.COCKTAIL_DB_API_KEY
    const url = `https://www.thecocktaildb.com/api/json/v2/${key}/list.php?i=list`

    const response = await fetch(url)
    const data = await response.json()
    const ingredientsData = data.drinks
    const ingredients = ingredientsData.map((dataObj) => {
      return { name: dataObj.strIngredient1 }
    })

    for (const ingredient of ingredients) {
      const apiIngredientName = ingredient.name
      .toLowerCase().split(" ").join("_")

      const detailUrl = `https://www.thecocktaildb.com/api/json/v2/${key}/search.php?i=${apiIngredientName}`

      try {
        const response = await fetch(detailUrl)
        const data = await response.json()

        if (data.ingredients === null) {
          console.log(`Could not find ${apiIngredientName}`)
        } else {
          const detail = data.ingredients[0]

          let description = ""
          if (!detail.strDescription) {
            console.log(`${apiIngredientName} has no description.`)
          } else if (detail.strDescription.length > 5000) {
            console.log(`${apiIngredientName} has ${detail.strDescription.length} chars`)
            description = detail.strDescription.slice(0, 4999)
          } else {
            description = detail.strDescription
          }

          let type = ""
          if (!detail.strType) {
            console.log(`${apiIngredientName} has no type.`)
          } else {
            type = detail.strType
          }

          const imageUrl = `http://www.thecocktaildb.com/images/ingredients/${apiIngredientName}-Medium.png`

          const ingredientDetail = {
            ...ingredient,
            description,
            type,
            imageUrl,
          }

          await Ingredient.query().insert(ingredientDetail)
        }
      } catch (error) {
        console.log(`Error in fetch of ${apiIngredientName}`)
        console.log(error)
      }
    }
  }
}

export default IngredientSeeder
