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



app.listen(port, () => console.log(`Express server listening in on port ${port}`))

