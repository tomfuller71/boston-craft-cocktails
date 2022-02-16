import allow from "./service/allow.js"

class IngredientSerializer {
    static getSummary(ingredient) {
        return allow(ingredient, ["id", "name", "type", "imageUrl"])
    }

    static getDetail(ingredient) {
        return allow(ingredient, [ "name", "type", "description", "imageUrl"])
    }

    static serializeCollection(ingredients) {
        return ingredients.map((ingredient) => {
            return this.getSummary(ingredient)
        })
    }
}

export default IngredientSerializer