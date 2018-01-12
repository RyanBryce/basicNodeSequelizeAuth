var db = require('../models')
module.exports = function (app){
  app.get("/api/login", function (req, res) {
    console.log(req.body)
    console.log(req.session)
    console.log(req.session.cookie)
    var user = {}; //found 

    res.json(user)
  })


  app.post("/api/signUp", function (req, res) {
    db.Users.create(req.body).then(function (dbPost) {
      res.json(dbPost);
    });
  });
}