module.exports = function(sequelize, DataTypes) {
    var Purchase = sequelize.define('Purchase', {
        date: DataTypes.DATE,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    });

    Purchase.associate = function(models) {
        Purchase.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Purchase.belongsToMany(models.Movie, { through: 'Purchase_Movie' });
    }
    return Purchase;

};