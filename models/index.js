const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');
const InventoryItem = require('./InventoryItem');

User.init(sequelize);
InventoryItem.init(sequelize);

sequelize.sync();

module.exports = {
  User,
  InventoryItem,
  sequelize,
};