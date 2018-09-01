const mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB || 'mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  htmlurl: {type: String, unique: true},
  login: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  data.forEach(function(elem) {
   console.log(elem.login)
    var item = new Repo ({
      name: elem.name,
      htmlurl: elem['html_url'],
      login: elem.owner.login
    });
    item.save(function(err) {
      if(err) { console.log(err) };
    });
  });  
}

module.exports.Repo = Repo;
module.exports.save = save;