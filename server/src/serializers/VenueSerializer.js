import CocktailSerializer from "./CocktailSerializer.js"
import IngredientSerializer from "./IngredientSerializer.js"
import ReviewSerializer from "./ReviewSerializer.js"
import allow from "./service/allow.js"

class VenueSerializer {
    static getSummary(venue) {
        return allow(venue, ["id", "name", "lat", "lng"])
    }

    static async getDetail(venue) {
        const serializedVenue = this.getSummary(venue)
        const cocktails = await venue.$relatedQuery("cocktails")
        const serializedCocktails = await CocktailSerializer.serializeCollection(cocktails)

        const reviews = serializedCocktails.reduce((total, cocktail) => {
            total.count += cocktail.reviews.length
            total.sumRating += cocktail.reviews.length * cocktail.averageRating
            return total
        }, { count: 0, sumRating: 0 })

        const avgRating = reviews.count ? reviews.sumRating / reviews.count : 0

        return {
            ...serializedVenue,
            reviewCount: reviews.count,
            rating: Math.round(avgRating),
            cocktails: serializedCocktails,
        }
    }

    static async serializeCollection(venues) {
        return Promise.all(venues.map((venue) => {
            return this.getDetail(venue)
        }))
    }
}

export default VenueSerializer