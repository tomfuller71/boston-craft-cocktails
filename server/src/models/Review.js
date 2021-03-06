const Model = require("./Model");


class Review extends Model {

    static get tableName() { 
        return "reviews"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["reviewText", "rating"],
            properties: {
                reviewText: { type: "string" },
                rating: { type: "integer", maximum: 5 },
                cocktailId: { type: ["integer", "string"]},
                userId: { type: ["integer", "string"] }
            }
        }
    }

    static get relationMappings() {
        const { Cocktail, User, Venue } = require("./index.js")

        return {
            cocktail: {
                relation: Model.BelongsToOneRelation,
                modelClass: Cocktail,
                join: {
                    from: "reviews.cocktailId",
                    to: "cocktails.id"
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "reviews.userId",
                    to: "users.id"
                }
            },
            venue: {
                relation: Model.BelongsToOneRelation,
                modelClass: Venue,
                join: {
                    from: "reviews.cocktailId",
                    through: {
                        from: "cocktails.id",
                        to: "cocktails.venueId"
                    },
                    to: "venues.id"
                }
            }
        }
    }
}

module.exports = Review