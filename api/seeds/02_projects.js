/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE project_table CASCADE');
  await knex('project_table').del()
  await knex('project_table').insert([
    {name: 'proj1 name', problem_statement: "yep, it's a problem", submitter_id: 4, is_approved: false, is_accepted: false, accepted_by_id: 1, is_completed: false},
    {name: 'proj2 name', problem_statement: "indeed, a second problem", submitter_id: 2, is_approved: true, is_accepted: false, accepted_by_id: 1, is_completed: false},
    {name: 'proj3 name', problem_statement: "zoinks, a third problem", submitter_id: 3, is_approved: true, is_accepted: true, accepted_by_id: 3, is_completed: false},
    {name: 'proj4 name', problem_statement: "golly gee scoobz, a fourth problem", submitter_id: 1, is_approved: true, is_accepted: true, accepted_by_id: 5, is_completed: true}
  ]);
};