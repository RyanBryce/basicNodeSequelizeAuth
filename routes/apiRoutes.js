var db = require('../models')
var bcrypt = require('bcrypt');
// console.log(db, "this is db")
module.exports = function (app){

  //login endpoint
  app.post("/api/login", function (req, res) {
    console.log(req.body)
    console.log(req.session)
    var user = {}; //found 
    db.users.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(function (dbData) {

        if (!dbData && typeof dbData === "object"){
          res.status(404).send('ohhh no, there is a problem with the username or password!')
        }else{

          bcrypt.compare(req.body.password, dbData.dataValues.password, function (err, bcryptRes) {
            // res == true
            if (!bcryptRes) {
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

        }
      });
  })

// signin enpoint logic
  app.post("/api/signUp", function (req, res, next) {
    console.log(req.body)
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        // Store hash in your password DB.
        req.body.password = hash;
          db.users.create(req.body).then(function (dbData) {
            res.json(dbData);
          });
      });
    });
  });
  //endpoint for grabbing session user object to be used accrossed entire app.
  app.get("/api/session", function(req, res, next){
    res.json(req.session.user)
  });
  
  //get user info endpoint via query params
  app.get('/api/profile/:username', function(req, res, next){
    console.log(req.param);
    db.users.findOne({
      where: {
        username: req.params.username
      }
    }).then(function(dbData){
      console.log(dbData)
      var userObj = {
        id: dbData.dataValues.id,
        name: dbData.dataValues.name,
        username: dbData.dataValues.username,
        email: dbData.dataValues.email,
        profilePic: dbData.dataValues.profilePic
      }
      res.json(userObj)
    })
  });
  //update profile route
  app.put('/api/update/:username', function(req, res, next){
    req.session.user.currentUser = req.body
    var loggedUser = req.session.user.currentUser;
    if(true){
      db.users.update({
        username: loggedUser.username,
        name: loggedUser.name,
        email: loggedUser.email,
        profilePic: loggedUser.profilePic
      }, {
          where: {
            username: req.params.username
          }
        }).then(function (dbData) {
          res.json(dbData.dataValues)
        })
    }else{
      res.status(404).json("please log in to update profile")
    }
  });
}