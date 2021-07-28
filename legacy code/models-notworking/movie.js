module.exports = function(sequelize, DataTypes) {
    var Movie = sequelize.define("Movie", {
        genre_ids: DataTypes.INTEGER,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        original_language: DataTypes.STRING,
        original_title: DataTypes.STRING,
        overview: DataTypes.STRING,
        popularity: DataTypes.DECIMAL(10, 3),
        poster_path: DataTypes.STRING,
        release_date: DataTypes.STRING,
        title: DataTypes.STRING,
        vote_average: DataTypes.DECIMAL(10, 2),
        vote_count: DataTypes.INTEGER,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    });

    Movie.associate = function(models) {
        Movie.belongsToMany(models.Shoppingcart, { through: 'Shoppingcart_Movie' });
        Movie.belongsToMany(models.Purchase, { through: 'Purchase_Movie' });
    };

    return Movie;
};