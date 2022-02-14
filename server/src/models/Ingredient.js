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
            required: ["name", "description"],
            properties: {
                name: { type: "string" },
                description: { type: "string", maxLength: 255 },
            }
        }
    }

    static get relationMappings() {
        const { Cocktail } = require("./index.js")

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
            }
        }
    }
}

module.exports = Ingredient