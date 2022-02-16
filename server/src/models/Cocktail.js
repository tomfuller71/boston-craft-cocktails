const { HasManyRelation } = require("./Model")
const Model = require("./Model")

const unique = require("objection-unique")({
  fields: [["name", "venueId"]],
  identifiers: ["id"],
})

class Cocktail extends unique(Model) {
  static get tableName() {
    return "cocktails"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
        description: { type: "string", maxLength: 255 },
        venueId: { type: "integer" },
        image: { type: "string " },
      },
    }
  }

  static get relationMappings() {
    const { Venue, Ingredient, CocktailComponent, Review } = require("./index.js")

    return {
      venue: {
        relation: Model.BelongsToOneRelation,
        modelClass: Venue,
        join: {
          from: "cocktails.venueId",
          to: "venues.id",
        },
      },
      ingredients: {
        relation: Model.ManyToManyRelation,
        modelClass: Ingredient,
        join: {
          from: "cocktails.id",
          through: {
            from: "cocktailComponents.cocktailId",
            to: "cocktailComponents.ingredientId",
          },
          to: "ingredients.id",
        },
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "cocktails.id",
          to: "reviews.cocktailId",
        },
      },
      cocktailComponents: {
        relation: HasManyRelation,
        modelClass: CocktailComponent,
        join: {
          from: "cocktails.id",
          to: "cocktailComponents.cocktailId",
        },
      },
    }
  }
}

module.exports = Cocktail
