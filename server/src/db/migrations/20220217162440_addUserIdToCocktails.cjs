/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
   return knex.schema.alterTable("cocktails", (table) => {
       table.bigInteger("userId")
       .unsigned()
       .index()
       .references("users.id")
   })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("cocktails", (table) => {
        table.dropColumn("userId")
    })
}
