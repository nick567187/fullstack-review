const express = require('express');
const parser = require('body-parser');
const save = require('./../database/index.js').save;
const getReposByUsername = require('./../helpers/github.js').getReposByUsername;
let app = express();
const Repo = require('./../database/index.js').Repo;

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  getReposByUsername(req.body.results, function(results) {
    save(results);
    res.send(results)});
});

app.get('/repos', function (req, res) {
  console.log('got');
    Repo.find({}).sort({'_id': 'desc'}).limit(25).exec(function(error, result) {
      if(error) { console.log(error) };
      console.log('what am i sending to the client from the server in GET', result);
      res.send(result);
    })
  });


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

