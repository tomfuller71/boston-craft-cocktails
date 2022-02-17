import allow from "./service/allow"
import { Review } from "../models/index.js"

class ReviewSerializer {
    static getSummary(review) {
        return allow(review, ["reviewText", "rating", "userId"])
    }

    static async getDetail(review) {
        const cocktail = await review.$relatedQuery("cocktail")
        const user = await review.$relatedQuery("user")

        return {
            ...this.getSummary(review),
            cocktailName: cocktail.name,
            userName: user.name
        }
    }

    static async getDetailCollection(reviews) {
        return Promise.all(reviews.map((review) => {
            return this.getDetail(review)
        }))
    }
}

export default ReviewSerializer
