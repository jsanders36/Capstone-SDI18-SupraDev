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
   {first_name: 'Not Accepted', last_name: 'Not Accepted', username: 'admin', email: 'notAcc@admin.net', job_title: 'supradev', password: SHA256('admin').toString(), profile_pic: 'https://everydaypower.com/wp-content/uploads/2023/01/HAL-9000-Quotes-From-The-Famous-Space-Odyssey-Series.jpg', user_summary: "I'm sorry Dave, I'm afraid I can't do that...", is_supracoder: false, supradoubloons: 0},
   {first_name: 'Jamel', last_name: 'Sanders', username: 'MelSandz', email: 'JSandz@user.org', job_title: 'Supra Coder', password: SHA256('P@ssw0rd').toString(), profile_pic: 'https://d1ldvf68ux039x.cloudfront.net/thumbs/photos/2209/7421344/1000w_q95.jpg', user_summary: 'Connecting supracoders one app at a time.', is_supracoder: true, supradoubloons: 2100},
   {first_name: 'Bodie', last_name: 'Stodie', username: 'GoodBoy22', email: 'BStodie@user.org', job_title: '23.2 SOPS IT Rep', password: SHA256('P@ssw0rd').toString(), profile_pic: 'https://e7.pngegg.com/pngimages/136/22/png-clipart-user-profile-computer-icons-girl-customer-avatar-angle-heroes-thumbnail.png', user_summary: 'Fixing your laptops, one virus at a time.', is_supracoder: false, supradoubloons: 0},
   {first_name: 'Remi', last_name: 'Stemi', username: 'PrettyGirl23', email: 'RStemi@user.org', job_title: '20.5 SOPS Operator', password: SHA256('P@ssw0rd').toString(), profile_pic: 'https://as1.ftcdn.net/v2/jpg/02/85/15/18/1000_F_285151855_XaVw4eFq1QufklRbMFDxdAJos1OadAD1.jpg', user_summary: 'Operating cutting-edge X-Wing Starfighters', is_supracoder: false, supradoubloons: 0},
   {first_name: 'Harley', last_name: 'Quinn', username: 'harls93', email: 'harls93@antihero.org', job_title: 'Supra Coder', password: SHA256('ives').toString(), profile_pic: 'https://lh3.googleusercontent.com/I29quGiEZq6W7xSBXssYej2xQvTLQaSIvgF5XkTDCGZeaP2ZJN_FPfIcWqGWK97pIGM', user_summary: "It's good to be supradevvy", is_supracoder: true, supradoubloons: 2000},
   {first_name: 'Misato', last_name: 'Katsuragi', username: 'misatoK95', email: 'misatoK95@nerv.org', job_title: 'Ops Director', password: SHA256('eva').toString(), profile_pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDIrswYVBFlvEI-7lrWALPKIGQCo2n46BbjmJBcuSgkhw2R-1m-knYmVM1WVEavvij6E&usqp=CAU', user_summary: "All is well in the world", is_supracoder: false, supradoubloons: 0},
   {first_name: 'Bruce', last_name: 'Wayne', username: 'bwayne39', email: 'bwayne39@hero.org', job_title: 'CEO, Wayne Enterprises', password: SHA256('batman').toString(), profile_pic: 'https://i.pinimg.com/736x/98/72/73/9872732415e47ec3ed6c1cece23cfc86.jpg', user_summary: "Helping Gotham one software development iteration at a time.", is_supracoder: true, supradoubloons: 3200}


 ]);
};