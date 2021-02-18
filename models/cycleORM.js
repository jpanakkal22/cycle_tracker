module.exports = function(sequelize, DataTypes){
    var cycleTracker = sequelize.define("cycleTracker", {        
        miles: {
            type: DataTypes.INTEGER,            
        },        
        duration: {
            type: DataTypes.INTEGER,            
        }       
    });

    cycleTracker.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        cycleTracker.belongsTo(models.User, {
            foreignKey: {
            allowNull: false
            }
        });
    };
    
   return cycleTracker;        
}
