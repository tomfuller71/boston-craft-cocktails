import allow from "./service/allow.js"

class IngredientSerializer {
    static getSummary(ingredient) {
        return allow(ingredient, ["name", "type", "imageUrl"])
    }

    static serializeCollection(ingredients) {
        return ingredients.map((ingredient) => {
            return this.getSummary(ingredient)
        })
    }
}

export default IngredientSerializer