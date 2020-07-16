/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('GameTypes', {
    gameTypesName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    neededToPlay: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // gameId: {
    //   type: DataTypes.TEXT,
    //   references: {
    //     model: 'game',
    //     key: 'id',
    //   },
    // },
  });
  Schedule.associate = (models) => {
    Schedule.hasMany(models.Game, {
      onDelete: 'cascade',
    });
  };
  // console.log(Schedule);
  return Schedule;
};
