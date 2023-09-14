/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_table', table => {
    table.increments('id'); // adds an auto incrementing PK column
    table.string('first_name').notNullable(); // equivalent of varchar(255)
    table.string('last_name').notNullable(); // equivalent of varchar(255)
    table.string('username').unique(); // equivalent of varchar(255)
    table.string('password').notNullable(); // equivalent of varchar(255)
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_table');
};
