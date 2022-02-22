/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("venues", (table) => {
    table.double("lat").notNullable()
    table.double("lng").notNullable()
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.alterTable("venues", (table) => {
    table.dropColumn("lat")
    table.dropColumn("lng")
  })
}
