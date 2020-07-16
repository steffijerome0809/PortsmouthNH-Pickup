/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    date: {
      type: DataTypes.DATE,
    },
    numOfPlayersSignedUp: {
      type: DataTypes.INTEGER,
    },
    // time: {
    //   type: DataTypes.TIME,
    // },
  });
  Game.associate = (models) => {
    // We're saying that a Game should belong to an User
    // A Game can't be created without an User due to the foreign key constraint
    Game.belongsToMany(models.User, {
      through: 'UserGame',
    });
    Game.belongsTo(models.GameTypes, {
      foreignKey: {
        allowNull: false,
      },
    });
    Game.belongsTo(models.Location, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Game;
};
