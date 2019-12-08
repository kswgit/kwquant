'use strict';
module.exports = (sequelize, DataTypes) => {
    const document = sequelize.define('document', {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        isDel: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },

        code: DataTypes.STRING,
        description: DataTypes.STRING,
    },
    {
      freezeTableName: true
    });
  return document;
};