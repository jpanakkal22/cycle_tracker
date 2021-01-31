// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = (app) => {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.get("/api/login", (req, res) => {
    const errors = req.flash().error || [];
    res.send(errors);
  })

  app.post("/api/login", passport.authenticate("local", { failureFlash: true 
    }), (req, res) => {
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
  
  // Route for posting all user challenge data to database
  app.post("/api/user-data", (req, res) => {
    db.cycleChallenge.create({
      miles: req.body.miles,
      duration: req.body.duration,      
      UserId: req.body.id
    })
      .then(function(allStats) {
        console.log("Info Added.")
        res.json(allStats);      
      });
  });

  

  // Route for getting all user challenge data from database
  app.get("/api/all-stats", function(req, res) {
      db.cycleChallenge.findAll({})
      .then(function(allStats){
        console.log(allStats);
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
