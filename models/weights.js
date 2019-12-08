'use strict';
module.exports = (sequelize, DataTypes) => {
    const weights = sequelize.define('weights', {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        isDel: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },

        name: DataTypes.STRING,
        description: DataTypes.STRING,
    },
    {
      freezeTableName: true
    });
  return weights;
};