import { Venue, Cocktail, User } from "../../models/index.js"
import { readFile } from "fs/promises"

class ReviewSeeder {
  static async seed() {
    const users = await User.query()
    const venues = await Venue.query()
    const mockCommentsUrl = new URL(
        "./mockData/mockComments.json",
        import.meta.url
    )

    const commentsFile = await readFile(mockCommentsUrl)
    const comments = JSON.parse(commentsFile)
    const reviewTexts = []
    for (const comment of comments) {
      reviewTexts.push(comment.body)
    }

    for (const venue of venues) {
      const cocktails = await Cocktail.query()

      for (const cocktail of cocktails) {
        const randomNumberReviews = Math.floor(Math.random() * 8)

        for (let i = 0; i < randomNumberReviews; i++) {
          const randomUserIndex = Math.floor(Math.random() * (users.length))
          const reviewText = reviewTexts.pop()

          if (reviewText) {
            const rating = Math.ceil(Math.random() * 5)
            const userId = parseInt(users[randomUserIndex].id)
            const reviewData = { reviewText, rating, userId }

            await cocktail.$relatedQuery("reviews").insert(reviewData)
          }
        }
      }
    }
  }
}

export default ReviewSeeder
