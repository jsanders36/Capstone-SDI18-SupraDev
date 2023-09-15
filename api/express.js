const express = require('express');
const app = express();
const port = 8080;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
app.use(express.json());

app.get('/users', (req, res) => {
  knex('user_table')
    .select('*')
    .then((user) => {res.send(user)});
})

app.get('/users/:id', (req, res) => {
  knex('user_table')
    .select('*')
    .where({ id: req.params.id })
    .then((user) => {res.send(user)});
})

app.post('/users', (req, res) => {
  knex("user_table")
  .insert(req.body)
  .then((newUser) => {
    res.send(
      req.body.first_name,
      req.body.last_name,
      req.body.username,
      req.body.password,
      req.body.profile_pic,
      req.body.user_summary,
      req.body.is_supracoder,
      `post was successful`
    );
      console.log('post was successful')
  })
})

app.patch('/users/:id', (req, res) => {
  knex('user_table')
    .where({ id: req.params.id })
    .update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
      profile_pic: req.body.profile_pic,
      user_summary: req.body.user_summary,
      is_supracoder: req.body.is_supracoder,
    })
    .then((updateRows) => res.send('user updated'))
})

app.delete('/users/:id', (req, res) => {
  knex('user_table')
    .where({ id: req.params.id })
    .del()
    .then(res.send('user deleted'))
})

app.get('/projects', (req, res) => {
  knex('project_table')
    .select('*')
    .then((project) => {res.send(project)});
})

app.get('/projects/:id', (req, res) => {
  knex('project_table')
    .select('*')
    .where({ id: req.params.id })
    .then((project) => {res.send(project)});
})


// table.increments('id');
// table.string('name');
// table.string('problem_statement');
// table.integer('submitter_id');
// table.foreign('submitter_id').references('user_table.id');
// table.boolean('is_approved');
// table.boolean('is_accepted');
// table.integer('accepted_by_id');
// table.foreign('accepted_by_id').references('user_table.id');
// table.boolean('is_completed');


app.post('/projects', (req, res) => {
  knex("user_table")
  .insert(req.body)
  .then((newProject) => {
    res.send(
      req.body.name,
      req.body.problem_statement,
      req.body.submitter,
      req.body.is_approved,
      req.body.is_accepted,
      req.body.accepted_by_id,
      req.body.is_completed,
      `post was successful`
    );
      console.log('post was successful')
  })
})

app.patch('/projects/:id', (req, res) => {
  knex('project_table')
    .where({ id: req.params.id })
    .update({
      name: req.body.name,
      problem_statement: req.body.problem_statement,
      submitter: req.body.submitter,
      is_approved: req.body.is_approved,
      is_accepted: req.body.is_accepted,
      accepted_by_id: req.body.accepted_by_id,
      is_completed: req.body.is_completed,
    })
    .then((updateRows) => res.send('project updated'))
})

app.delete('/projects/:id', (req, res) => {
  knex('project_table')
    .where({ id: req.params.id })
    .del()
    .then(res.send('project deleted'))
})

app.listen(port, () => console.log(`Express server listening in on port ${port}`))

