/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("cocktailComponents", (table) => {
        table.bigIncrements("id") 
  
        table.bigInteger("cocktailId")
        .unsigned()
        .notNullable()
        .index()
        .references("cocktails.id")
  
        table.bigInteger("ingredientId")
        .unsigned()
        .notNullable()
        .index()
        .references("ingredients.id")
  
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("cocktailComponents")
}
