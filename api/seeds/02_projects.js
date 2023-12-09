/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE project_table CASCADE');
  await knex('project_table').del()
  await knex('project_table').insert([
    {name: 'Smart Energy Management System', problem_statement: "We need a system that can monitor energy consumption patterns in real-time and suggest automated adjustments to optimize energy usage and reduce costs.", submitter_id: 7, is_approved: true, is_accepted: false, accepted_by_id: 1, is_completed: false, bounty_payout: 200, github_url: ''},
    {name: 'Healthcare Appointment Scheduler', problem_statement: "The current appointment scheduling process in our healthcare facility is inefficient. We require software that can streamline scheduling, send reminders, and manage patient appointments seamlessly.", submitter_id: 2, is_approved: true, is_accepted: false, accepted_by_id: 1, is_completed: false, bounty_payout: 100, github_url: ''},
    {name: 'Inventory Optimization Platform', problem_statement: "Our inventory management is becoming increasingly complex. We need a software solution that can predict demand, optimize stock levels, and reduce carrying costs.", submitter_id: 3, is_approved: true, is_accepted: true, accepted_by_id: 7, is_completed: false, bounty_payout: 300, github_url: 'https://github.com/'},
    {name: 'Environmental Monitoring Dashboard', problem_statement: "Environmental data collection is vital, but our current systems are outdated. We need a modern dashboard that can aggregate and visualize data from various sensors for better decision-making in environmental management.", submitter_id: 1, is_approved: true, is_accepted: true, accepted_by_id: 5, is_completed: false, bounty_payout: 500, github_url: 'https://github.com/'},
    {name: 'Close approach alert software', problem_statement: "The current timeline for close approach is too long given the current process. Looking for an app that can pull in information from spacetrack, compare it to our state vector, and send automated alerts if a close approach is within a certian time period", submitter_id: 6, is_approved: true, is_accepted: true, accepted_by_id: 5, is_completed: false, bounty_payout: 700, github_url: 'https://github.com/'},
    {name: 'Financial Wellness Tracker', problem_statement: "Financial well-being is a priority for our employees. We're searching for a tool that can provide personalized financial advice, track expenses, and offer budgeting recommendations.", submitter_id: 6, is_approved: true, is_accepted: true, accepted_by_id: 2, is_completed: false, bounty_payout: 200, github_url: 'https://github.com/'},
    {name: 'Remote Team Collaboration Hub', problem_statement: "As remote work becomes the norm, we need a centralized platform that seamlessly integrates video conferencing, document collaboration, and task management to enhance team productivity and communication.", submitter_id: 4, is_approved: true, is_accepted: false, accepted_by_id: 1, is_completed: false, bounty_payout: 500, github_url: 'https://github.com/'}
  ]);
};