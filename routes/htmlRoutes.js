var fs = require('fs');
var path = require('path');
module.exports = function(app){
  //render the maimn html page/
  app.get('/', function (req, res) {
    //this will show the session object
   console.log(req.session.user)
   res.sendFile(path.join(__dirname, "../public/html/index.html"))
  })

  app.get('/profile/:username', function (req, res) {
    //this will show the session object
    console.log(req.session.user)
    res.sendFile(path.join(__dirname, "../public/html/userProf.html"))
  })
  //catch all route
  app.get('*', function (req, res) {
    console.log(req.session.user)
    res.sendFile(path.join(__dirname, "../public/html/index.html"))
  })

}
