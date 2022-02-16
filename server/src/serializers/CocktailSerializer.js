import IngredientSerializer from "./IngredientSerializer.js"
import allow from "./service/allow.js"

class CocktailSerializer {
    static getSummary(cocktail) {
        return allow(cocktail, ["id", "name", "description", "image", "venueId"])
    }

    static async getDetail(cocktail) {
        const serializedCocktail = this.getSummary(cocktail)
        const ingredients = await cocktail.$relatedQuery("ingredients")
        const venue = await cocktail.$relatedQuery("venue")
        return {
            ...serializedCocktail,
            venueName: venue.name,
            ingredients: IngredientSerializer.serializeCollection(ingredients)
        }
    }

    static async serializeCollection(cocktails) {
        return Promise.all(cocktails.map((cocktail) => {
            return this.getDetail(cocktail)
        }))
    }
}

export default CocktailSerializer