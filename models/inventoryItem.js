const { Model, DataTypes } = require('sequelize');

class InventoryItem extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
      },
      { sequelize, modelName: 'inventoryItem' }
    );
  }
}

module.exports = InventoryItem;
