'use strict';
module.exports = (sequelize, DataTypes) => {
    const document = sequelize.define('document', {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        isDel: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },

        stockId: DataTypes.INTEGER,

        date: DataTypes.DATE,
        price: DataTypes.INTEGER,
    },
    {
      freezeTableName: true
    });
  return document;
};