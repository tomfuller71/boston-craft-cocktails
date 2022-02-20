import IngredientSerializer from "./IngredientSerializer.js"
import ReviewSerializer from "./ReviewSerializer.js"
import allow from "./service/allow.js"

class VenueSerializer {
    static getSummary(venue) {
        return allow(venue, ["id", "name"])
    }

    static async getDetail(venue) {
        const serializedVenue = this.getSummary(venue)
        const cocktails = await venue.$relatedQuery("cocktails")
        const reviews = await venue.$relatedQuery("reviews")
        const serializedReviews = await ReviewSerializer
        .getDetailCollection(reviews)

        const averageRating = (serializedReviews.reduce((total, current) => {
            return total += current.rating
        }, 0) / serializedReviews.length).toFixed(1)

        return {
            ...serializedCocktail,
            venueName: venue.name,
            averageRating,
            ingredients: IngredientSerializer.serializeCollection(ingredients),
            reviews: serializedReviews,
        }
    }

    static async serializeCollection(venues) {
        return Promise.all(venues.map((venue) => {
            return this.getDetail(venue)
        }))
    }
}

export default VenueSerializer