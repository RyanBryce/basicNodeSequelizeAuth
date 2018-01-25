var fs = require('fs');
var path = require('path');
module.exports = function(app){
  //render html 
  app.get('/', function (req, res) {
   console.log(req.session.user)
   res.sendFile(path.join(__dirname, "../public/html/index.html"))
  })

  // app.get('/profile', function (req, res) {
  //   console.log(req.session.user)
  //   res.sendFile(path.join(__dirname, "../public/html/userProf.html"))
  // })

  app.get('/profile/:username', function (req, res) {
    console.log(req.session.user)
    res.sendFile(path.join(__dirname, "../public/html/userProf.html"))
  })

}
