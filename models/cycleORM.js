module.exports = function(sequelize, DataTypes){
    var cycleChallenge = sequelize.define("cycleChallenge", {
        challenge: {
            type: DataTypes.STRING, 
        },
        miles: {
            type: DataTypes.INTEGER,            
        },        
        duration: {
            type: DataTypes.INTEGER,            
        }       
    });

    cycleChallenge.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        cycleChallenge.belongsTo(models.User, {
            foreignKey: {
            allowNull: false
            }
        });
    };
    
   return cycleChallenge;        
}
