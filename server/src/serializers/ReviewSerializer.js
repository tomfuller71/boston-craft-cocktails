import allow from "./service/allow.js"
import { Review } from "../models/index.js"

class ReviewSerializer {
    static getSummary(review) {
        return allow(review, ["id", "reviewText", "rating", "userId"])
    }

    static async getDetail(review) {
        const user = await review.$relatedQuery("user")

        return {
            ...this.getSummary(review),
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
