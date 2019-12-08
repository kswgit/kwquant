'use strict';
module.exports = (sequelize, DataTypes) => {
    const stocks = sequelize.define('stocks', {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        isDel: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },

        code: DataTypes.STRING,
        description: DataTypes.STRING,
    },
    {
      freezeTableName: true
    });
  return stocks;
};