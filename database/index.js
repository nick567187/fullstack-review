const mongoose = require('mongoose');
mongoose.connect('mongodb://nick567187:charles1@ds018508.mlab.com:18508/tester');

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