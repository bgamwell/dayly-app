// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    User = require('./models/user'),
    Log = require('./models/log');

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/dayly' // plug in the db name you've been using
);

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000 }
}));

// variable to ensure mongo search works
var ObjectId = mongoose.Schema.Types.ObjectId;

// ******Middleware to manage sessions******

app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) { // "currentUser" is defined in the express middleware to manage sessions
    User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  // destroy `session.userId` to log out user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();
});

// *****Static Routes*****

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html'); // send index.html to localhost:3000 as the homepage
});

// user submits the login form
app.post('/login', function (req, res) {

  // grab user data from params (req.body)
  var userData = req.body.user;

  // call authenticate function to check if password user entered is correct
  User.authenticate(userData.email, userData.password, function (err, user) {
    // saves user id to session
    req.login(user);

    // redirect to user profile
    res.redirect('/profile');
  });
});

// create new user with secure password
app.post('/users', function (req, res) {
  var newUser = req.body.user;
  console.log(newUser.email);

  // if ( User.find({ email: newUser.email }) !== null ) {
  //   throw new Error('The email address you entered is already taken: ' + newUser.email);
  // }

  User.createSecure(newUser, function (err, user) {
    // log in user immediately when created
    req.login(user); //this does not seem to be working
    res.redirect('/profile');
  });
});

// user profile page
app.get('/profile', function (req, res) {
  // finds user currently logged in
  req.currentUser(function (err, user) {
    if (user) {
    res.sendFile(__dirname + '/public/views/profile.html');
  } else {
    res.redirect('/');
  }
  });
});

// log out user (destroy session)
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// *****API Routes*****

// show current user
app.get('/api/users/current', function (req, res) { // returns all info on a current user; question: is creating a public api like this secure? the user's hashed and salted password is available to anyone with the api URL, or is this not a concern because the user has to be logged in for the api to be available?
  // check for current (logged-in) user
  req.currentUser(function (err, user) {
    res.json(user);
  });
});

// create new log
app.post('/api/logs', function (req, res) {

  // currentUser = req.currentUser.id;
  currentUser = req.session.userId;
  console.log("This is the current user!");
  console.log(currentUser);

  var logData = req.body.log;

  var currentdate = new Date();
  var datetime = (currentdate.getMonth()+1) + "/"
                  + currentdate.getDate() + "/"
                  + currentdate.getFullYear() + " @ "
                  + currentdate.getHours() + ":"
                  + currentdate.getMinutes();

  // create new instance of Log
  var newLog = new Log({
    diary_entry: logData.diary_entry,
    date: datetime,
    user: currentUser
  });

  // save new log in db
  newLog.save( function(err, savedLog) {
    res.redirect('/profile'); //this is not the most efficient, but it works. how can we prevent page reload every time?
  });

});

// show all logs
app.get('/api/logs', function (req, res) { // render every single log to the homepage
  Log.find(function (err, logs) {
    res.json(logs);
  });
});

// show all logs for the current user
app.get('/api/currentlogs', function(req, res) {
  Log.find({ user: req.session.userId }, function(err, logs){ //this test function is returning a 404 error
    res.json(logs);
  });
});

// update a dayly
app.put('/api/logs/:id', function(req, res) {
  Log.findById({_id: req.params.id}, function( err, foundLog) {
  foundLog.diary_entry = req.body.diary_entry;
  foundLog.save();
  });
});

app.delete('/api/logs/:id', function(req, res) {
  Log.findById(req.params.id, function(err, foundLog){
    res.json(foundLog);
    foundLog.remove();
  });
});

app.listen(process.env.PORT || 3000);
