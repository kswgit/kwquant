'use strict';
module.exports = (sequelize, DataTypes) => {
    const predictions = sequelize.define('predictions', {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        isDel: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },

        stockId: DataTypes.INTEGER,
        
        epsilon: DataTypes.FLOAT,

        lambda: DataTypes.FLOAT,
        
        lambda1: DataTypes.FLOAT,
        lambda2: DataTypes.FLOAT,
        lambda3: DataTypes.FLOAT,
        lambda4: DataTypes.FLOAT,
        lambda5: DataTypes.FLOAT,
        lambda6: DataTypes.FLOAT,
        lambda7: DataTypes.FLOAT,
        lambda8: DataTypes.FLOAT,
        lambda9: DataTypes.FLOAT,
        lambda10: DataTypes.FLOAT,
        lambda11: DataTypes.FLOAT,
    },
    {
      freezeTableName: true
    });
  return predictions;
};