const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const GenericModel = sequelize.define('GenericModel', {}, {
  tableName: 'reservations', 
  freezeTableName: true
  //   timestamps: false,
});


module.exports = GenericModel;