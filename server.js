
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');
var session = require('express-session');
var db = require('./models')

var app = express()
app.use(express.static('./public'))
app.use(cors());

var PORT = process.env.PORT

app.use(session({
  secret: process.env.SESSIONSECRET || config.sessionSecret,
  resave: false,
  saveUninitialized: true
}));

//middleware for setting up a user object when anyone first come to the appplication
function userSetup(req, res, next){
  if(!req.session.user){
    req.session.user = {}
    req.session.user.loggedIn = false;
  }
  next()
}

//using middlewhere acrossed the entire application before any route gets hit.
app.use(userSetup)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


require('./routes/htmlRoutes')(app)
require('./routes/apiRoutes')(app)



db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
