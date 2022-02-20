import IngredientSerializer from "./IngredientSerializer.js"
import ReviewSerializer from "./ReviewSerializer.js"
import allow from "./service/allow.js"

class CocktailSerializer {
    static getSummary(cocktail) {
        return allow(cocktail, ["id", "name", "description", "image", "venueId"])
    }

    static getAverageRating(reviews) {
        return (reviews.reduce((total, current) => {
            return total += current.rating
        }, 0) / reviews.length).toFixed(1)
    }

    static async getDetail(cocktail) {
        const serializedCocktail = this.getSummary(cocktail)
        const ingredients = await cocktail.$relatedQuery("ingredients")
        const venue = await cocktail.$relatedQuery("venue")
        const reviews = await cocktail.$relatedQuery("reviews")
        const serializedReviews = await ReviewSerializer
        .getDetailCollection(reviews)

        const averageRating = this.getAverageRating(serializedReviews)

        return {
            ...serializedCocktail,
            venueName: venue.name,
            averageRating,
            ingredients: IngredientSerializer.serializeCollection(ingredients),
            reviews: serializedReviews,
        }
    }

    static async serializeCollection(cocktails) {
        return Promise.all(cocktails.map((cocktail) => {
            return this.getDetail(cocktail)
        }))
    }
}

export default CocktailSerializer