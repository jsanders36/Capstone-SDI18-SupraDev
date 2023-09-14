/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
 // Deletes ALL existing entries
 await knex('user_table').del()
 await knex('user_table').insert([
   {id: 1, first_name: 'Jamel', last_name: 'Sanders', username: 'MelSandz', password: 'P@ssw0rd'},
   {id: 2, first_name: 'Bodie', last_name: 'Stodie', username: 'GoodBoy22', password: 'P@ssw0rd' },
   {id: 3, first_name: 'Remi', last_name: 'Stemi', username: 'PrettyGirl23', password: 'P@ssw0rd'}
 ]);
};
