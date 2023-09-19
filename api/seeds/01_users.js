/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { SHA256 } = require('crypto-js')

exports.seed = async function(knex) {
 // Deletes ALL existing entries
 await knex.schema.raw('TRUNCATE user_table CASCADE');
 await knex('user_table').del()
 await knex('user_table').insert([
   {first_name: 'Not Accepted', last_name: '', username: '', password: SHA256('P@').toString(), profile_pic: '', user_summary: '', is_supracoder: false},
   {first_name: 'Jamel', last_name: 'Sanders', username: 'MelSandz', password: SHA256('P@ssw0rd').toString(), profile_pic: 'pic url', user_summary: '', is_supracoder: true},
   {first_name: 'Bodie', last_name: 'Stodie', username: 'GoodBoy22', password: SHA256('P@ssw0rd').toString(), profile_pic: 'pic url', user_summary: '', is_supracoder: false},
   {first_name: 'Remi', last_name: 'Stemi', username: 'PrettyGirl23', password: SHA256('P@ssw0rd').toString(), profile_pic: 'pic url', user_summary: '', is_supracoder: false},
   {first_name: 'Harley', last_name: 'Quinn', username: 'harls93', password: SHA256('ives').toString(), profile_pic: 'https://i.pinimg.com/originals/52/b3/03/52b303e35c513ed267bf615aa7b942c2.jpg', user_summary: "It's good to be bad", is_supracoder: true}
 ]);
};