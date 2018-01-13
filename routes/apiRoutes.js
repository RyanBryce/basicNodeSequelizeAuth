var db = require('../models')
// console.log(db, "this is db")
module.exports = function (app){
  app.post("/api/login", function (req, res) {
    console.log(req.body)
    console.log(req.session)
    console.log(req.session.cookie)
    var user = {}; //found 
    db.users.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    })
      .then(function (dbData) {
        console.log(dbData)
        res.json(dbData);
      });
  })


  app.post("/api/signUp", function (req, res) {
    console.log(req.body)
    db.users.create(req.body).then(function (dbData) {

      res.json(dbData);
    });
  });
}