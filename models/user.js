// Requiring bcrypt for password hashing. 
const bcrypt = require("bcryptjs");

// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    // The email cannot be null and must be a unique
    email: {
      type: DataTypes.STRING,
      allowNull: false,      
      unique: true      
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false      
    },
    // Name must be letters only
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "Name must be letters only"
        }
      }      
    }
  });

  User.associate = function(models) {
    User.hasMany(models.cycleChallenge, {
      onDelete: "cascade"
    });
   }
   
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);    
  };
  
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
