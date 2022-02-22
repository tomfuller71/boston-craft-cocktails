const Model = require("./Model");

const unique = require("objection-unique")({
    fields: ["name"],
    identifiers: ["id"]
})

class Venue extends unique(Model) {

    static get tableName() { 
        return "venues"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name"],
            properties: {
                name: {type: "string"},
                lat: {type: ["number", "string"]},
                lng: {type: ["number", "string"]},
            }
        }
    }

    static get relationMappings() {
        const { Cocktail, Review } = require("./index.js")

        return {
            cocktails: {
                relation: Model.HasManyRelation,
                modelClass: Cocktail,
                join: {
                    from: "venues.id",
                    to: "cocktails.venueId"
                }
            },
            reviews: {
                relation: Model.HasManyRelation,
                modelClass: Review,
                join: {
                    from: "venue.id",
                    through: {
                        from: "cocktails.venueId",
                        to: "cocktails.id"
                    },
                    to: "reviews.cockTailId"
                }
            }
        }
    }
}

module.exports = Venue