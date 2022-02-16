const Model = require("./Model");

const unique = require("objection-unique")({
    fields: ["name"],
    identifiers: ["id"]
})

class Ingredient extends unique(Model) {

    static get tableName() { 
        return "ingredients"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string" },
                description: { type: "string" },
                type: { type: "string" },
                imageUrl: { type: "string" },
            }
        }
    }

    static get relationMappings() {
        const { Cocktail, CocktailComponent } = require("./index.js")

        return {
            cocktails: {
                relation: Model.ManyToManyRelation,
                modelClass: Cocktail,
                join: {
                    from: "ingredients.id",
                    through: {
                        from: "cocktailComponents.ingredientId",
                        to: "cocktailComponents.cocktailId"
                    },
                    to: "cocktail.id"
                }
            },
            cocktailComponents: {
                relation: Model.HasManyRelation,
                modelClass: CocktailComponent,
                join: {
                    from: "ingredients.id",
                    to: "cocktailComponents.ingredientId"
                }
            }

        }
    }
}

module.exports = Ingredient