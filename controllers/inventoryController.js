const { InventoryItem } = require('../models');

const createItem = async (req, res) => {
  const { name, quantity } = req.body;
  await InventoryItem.create({ name, quantity });
  res.redirect('/inventory');
};

const getItems = async (req, res) => {
  const items = await InventoryItem.findAll();
  res.json(items);
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await InventoryItem.update({ name, quantity }, { where: { id } });
  res.redirect('/inventory');
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  await InventoryItem.destroy({ where: { id } });
  res.redirect('/inventory');
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
