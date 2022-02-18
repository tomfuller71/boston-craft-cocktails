const Model = require("./Model")

class CocktailComponent extends Model {
  static get tableName() {
    return "cocktailComponents"
  }

  static relationMappings() {
    const { Ingredient, Cocktail } = require("./index.js")

    return {
      ingredient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Ingredient,
        join: {
          from: "cocktailComponents.ingredientId",
          to: "ingredients.id"
        }
      },
			cocktail: {
				relation: Model.BelongsToOneRelation,
				modelClass: Cocktail,
				join: {
					from: "cocktailComponents.cocktailId",
					to: "cocktails.id"
				}
			}
    }
  }
}

module.exports = CocktailComponent
