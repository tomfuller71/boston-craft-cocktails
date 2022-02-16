import fetch from "node-fetch"

import { Ingredient, Cocktail, Venue, CocktailComponent } from "../../models/index.js"

class CocktailSeeder {
  static get key() {
    return process.env.COCKTAIL_DB_API_KEY
  }

  static async seed() {
    const venues = await Venue.query()
    for (const venue of venues) {
      const cocktailDetailCollection =  await this.getRandomCocktails(5)
      
      for (const detail of cocktailDetailCollection) {
        const cocktailData = {
          name: detail.strDrink,
          image: detail.strDrinkThumb,
          venueId: parseInt(venue.id)
        }
        
        const cocktail = await Cocktail.query().insertAndFetch(cocktailData)

        const ingredientNames = []
        // Api has 15 keys "strIngredient 1-15"
        for (let i = 1; i <=15; i++) {
          const name = detail[`strIngredient${i}`]
          if (name) {
            ingredientNames.push(name)
          }
        }

        for (const name of ingredientNames) {
          // using whereRaw as doesn't seem to be a case-insensitive find in objection and unfortunately the cockTailDB api mixes cases
          const ingredient = await Ingredient.query()
          .whereRaw("name ILIKE ?", [name])

          if (ingredient[0]) {
            await CocktailComponent.query()
            .insert({cocktailId: cocktail.id, ingredientId: ingredient[0].id})
          }
          else {
            console.log(`${name} not found in ingredients`)
          }
        }
      }
    }
  }

  static async getRandomCocktails(number) {
    const url = `https://www.thecocktaildb.com/api/json/v2/${this.key}/random.php`

    const randomFetchedCocktails = []
    for (let i = 0; i < number; i++) {
      try {
        const randomResponse = await fetch(url)
        const data = await randomResponse.json()
        const cocktail = data.drinks[0]

        const alreadyFetched = randomFetchedCocktails.some((drink) => {
          return drink.idDrink === cocktail.idDrink
        })
        if (!alreadyFetched) {
          randomFetchedCocktails.push(cocktail)
        }
      } catch (error) {
        console.log(`Error in fetch`)
        console.log(error)
      }
    }

    return randomFetchedCocktails
  }
}

export default CocktailSeeder
