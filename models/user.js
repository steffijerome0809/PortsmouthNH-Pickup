/* eslint-disable linebreak-style */
/* eslint-disable func-names */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */

const bcrypt = require('bcryptjs');
// const { uuid } = require('uuidv4');
// Creating our User model

// Creating our User model
module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line no-var
  const User = sequelize.define('User', {
    // The email cannot be null, and must be a proper email before creation
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during constious phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook('beforeCreate', (user) => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  User.associate = (models) => {
    User.belongsToMany(models.Game, {
      onDelete: 'cascade',
      through: 'UserGame',
    });
  };
  return User;
};
