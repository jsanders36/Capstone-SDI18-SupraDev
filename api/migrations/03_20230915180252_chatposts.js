/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('chatposts', table => {
    table.increments('id');
    table.integer('project_id');
    table.foreign('project_id').references('project_table.id');
    table.integer('user_id');
    table.foreign('user_id').references('user_table.id');
    table.string('post_text');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('chatposts', table => {
    table.dropForeign('project_id')
    table.dropForeign('user_id')
  })
  .then(function() {
    return knex.schema.dropTableIfExists('chatposts')
  })
};
