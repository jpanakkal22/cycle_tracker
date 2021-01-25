// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.User.create(req.body)
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err.message);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        firstName: req.user.firstName
      });
    }
  });
  // Route for setting goal
  // Route for reading goal
  // Route for setting distance and time
  // Route for reading all distance and time data / calculate total distance and time
  // Route for updating distance or time entry
  // Route for deleting distance and time entry
  // Route to send final data when goal is reached
  // Route to retrieve totals vs. goals
  
  // Route for posting all user challenge data to database
  app.post("/api/user-data", (req, res) => {
    console.log(req.body);
    // Call database to see if user has a challenge entry
    db.cycleChallenge.findAll({UserId:req.user.id})
    .then(function(allStats){
     console.log(allStats);
      // res.json(allStats);      
        if(allStats.length > 0){
          var miles = 0;
          var duration = 0;
          for(var i = 0; i < allStats.length; i++){
            miles += allStats[i].miles;
            duration += allStats[i].duration
          }

          miles += JSON.parse(req.body.miles);
          duration += JSON.parse(req.body.duration);

          db.cycleChallenge.findOne({
            id: allStats[0].id
          })
          console.log(miles);
          console.log(duration);
          res.json({miles: miles, duration: duration})

        }
        else {
          db.cycleChallenge.create({
            challenge: req.body.challenge,
            miles: req.body.miles,
            duration: req.body.duration,      
            UserId: req.body.id
          })
            .then(function(allStats) {
              res.json(allStats);      
            })
        }
    });        

    // If so, get the entry, update values

    // Else, create an entry



  });

  

  // Route for getting all user challenge data from database
  app.get("/api/all-stats", function(req, res) {
      db.cycleChallenge.findAll({})
      .then(function(allStats){
       
        res.json(allStats);

        // Maps all database information
        // var newArray = allStats.map(x => x.dataValues);

        // // Filters out all data with RUN
        // var filterArray = newArray.filter(function(y) {
        //   return y.challenge === 'run';});

        // // Filter out all data with WALK  
        // var filterArrayUserId = newArray.filter(function(z) {
        //   return z.UserId === 8;});           
           
      });          
  });
};
