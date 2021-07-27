var db = require('../models');

module.exports = function(sequelize, DataTypes) {
    const Shoppingcart_Movie = sequelize.define('Shoppingcart_Movie', {
        ShoppingcartId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.Shoppingcart,
                key: 'id'
            }
        },
        BookId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.Movie,
                key: 'id'
            }
        }
    });

    return Shoppingcart_Movie;
}