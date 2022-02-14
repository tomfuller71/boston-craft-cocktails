/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("cocktails", (table) => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.string("image")

    table.bigInteger("venueId")
    .unsigned()
    .notNullable()
    .index()
    .references("venues.id")

    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("cocktails")
}
