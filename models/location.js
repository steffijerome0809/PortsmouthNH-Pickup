/* eslint-disable linebreak-style */
/* eslint-disable eol-last */

/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
// eslint-disable-next-line linebreak-style

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        // eslint-disable-next-line linebreak-style
      },
    },
    // lat: {
    //   type: DataTypes.DECIMAL(10, 2),
    //   allowNull: false,
    // },
    // lng: {
    //   type: DataTypes.DECIMAL(10, 2),
    //   allowNull: false,
    // },
  });
  Location.associate = (models) => {
    Location.hasMany(models.Game, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Location;
};

// api call to data base, render inside drop downs