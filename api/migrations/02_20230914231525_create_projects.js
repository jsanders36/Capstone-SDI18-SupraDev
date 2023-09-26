/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('project_table', table => {
    table.increments('id');
    table.string('name');
    table.string('problem_statement');
    table.integer('submitter_id');
    table.foreign('submitter_id').references('user_table.id');
    table.boolean('is_approved');
    table.boolean('is_accepted');
    table.integer('accepted_by_id');
    table.foreign('accepted_by_id').references('user_table.id');
    table.boolean('is_completed');
    table.integer('bounty_payout');
    table.string('github_url')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('project_table', table => {
    table.dropForeign('submitter_id')
    table.dropForeign('accepted_by_id')
  })
  .then(function() {
    return knex.schema.dropTableIfExists('project_table')
  })
};
