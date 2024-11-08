const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  betriebId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gastId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  peopleCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  msg: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reservedFor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shiftId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  roomId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stayTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  userPerSmsInform: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  isTablePlan: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  feedbackHash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  feedbackSent: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  addOns: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  locked: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  paymentTemplate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  invoice: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  recurrenceId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  turnover: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  children: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  highChairs: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  resHotelID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  referrer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'reservations',
  timestamps: false,
});

module.exports = Reservation;
