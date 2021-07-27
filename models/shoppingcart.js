module.exports = function(sequelize, DataTypes) {
    var Shoppingcart = sequelize.define('Shoppingcart', {
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    });

    Shoppingcart.associate = function(models) {
        Shoppingcart.belongsTo(models.User, {
            allowNull: true
        });
        Shoppingcart.belongsToMany(models.Movie, { through: 'Shoppingcart_Movie' });
    };

    return Shoppingcart;
};

// module.exports = Purchase; ?