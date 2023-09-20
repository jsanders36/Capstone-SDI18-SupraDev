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
   {first_name: 'Not Accepted', last_name: '', username: 'admin', email: 'notAcc@admin.net', job_title: '', password: SHA256('P@').toString(), profile_pic: '', user_summary: '', is_supracoder: false},
   {first_name: 'Jamel', last_name: 'Sanders', username: 'MelSandz', email: 'JSandz@user.org', job_title: '', password: SHA256('P@ssw0rd').toString(), profile_pic: 'pic url', user_summary: '', is_supracoder: true},
   {first_name: 'Bodie', last_name: 'Stodie', username: 'GoodBoy22', email: 'BStodie@user.org', job_title: '', password: SHA256('P@ssw0rd').toString(), profile_pic: 'pic url', user_summary: '', is_supracoder: false},
   {first_name: 'Remi', last_name: 'Stemi', username: 'PrettyGirl23', email: 'RStemi@user.org', job_title: '', password: SHA256('P@ssw0rd').toString(), profile_pic: 'pic url', user_summary: '', is_supracoder: false},
   {first_name: 'Harley', last_name: 'Quinn', username: 'harls93', email: 'harls93@antihero.org', job_title: 'Not a Hero', password: SHA256('ives').toString(), profile_pic: 'https://lh3.googleusercontent.com/I29quGiEZq6W7xSBXssYej2xQvTLQaSIvgF5XkTDCGZeaP2ZJN_FPfIcWqGWK97pIGM', user_summary: "It's good to be bad", is_supracoder: true},
   {first_name: 'Misato', last_name: 'Katsuragi', username: 'misatoK95', email: 'misatoK95@nerv.org', job_title: 'Ops Director', password: SHA256('eva').toString(), profile_pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDIrswYVBFlvEI-7lrWALPKIGQCo2n46BbjmJBcuSgkhw2R-1m-knYmVM1WVEavvij6E&usqp=CAU', user_summary: "All is good in the world", is_supracoder: false}

 ]);
};