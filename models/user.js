var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        preference1: DataTypes.STRING,
        preference2: DataTypes.STRING,
        preference3: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updateAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    });

    User.associate = function(models) {
        User.hasOne(models.Shoppingcart, {
            allowNull: true
        });
        User.hasMany(Models.Purchase, {});
    };

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.addHook('beforeCreate', function(user) {
        user.password = bcrypt.hashSynch(user.password, bcrypt.genSaltSync(10), null);
    });
    return User;
}