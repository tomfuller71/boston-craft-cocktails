/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("reviews", (table) => {
      table.bigIncrements("id") 
      table.string("reviewText").notNullable()
      table.integer("rating").unsigned().notNullable()

      table.bigInteger("userId")
      .unsigned()
      .notNullable()
      .index()
      .references("users.id")

      table.bigInteger("cocktailId")
      .unsigned()
      .notNullable()
      .index()
      .references("cocktails.id")

      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
      table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())

  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("reviews")
}