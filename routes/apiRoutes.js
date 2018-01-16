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
        if (!dbData && typeof dbData === "object"){
          res.status(404).send('ohhh no, there is a problem with the username or password!')
        }else{
          var userObj = {
            id: dbData.dataValues.id,
            name: dbData.dataValues.name,
            username: dbData.dataValues.username,
            email: dbData.dataValues.email,
            profilePic: dbData.dataValues.profilePic
          }
          req.session.user.loggedIn = true;
          req.session.user.currentUser = userObj;

    
          console.log(dbData.dataValues)
          res.status(200).send('Successful login')

        }
      });
  })


  app.post("/api/signUp", function (req, res, next) {
    console.log(req.body)
    db.users.create(req.body).then(function (dbData) {
      res.json(dbData);
    });
  });
  //endpoint for grabbing session user object to be used accrossed entire app.
  app.get("/api/session", function(req, res, next){
    res.json(req.session.user)
  })
}