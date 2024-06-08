const express = require('express');
const { createItem, getItems, updateItem, deleteItem } = require('../controllers/inventoryController');
const { isAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', isAuthenticated, getItems);
router.post('/', isAuthenticated, createItem);
router.put('/:id', isAuthenticated, updateItem);
router.delete('/:id', isAuthenticated, deleteItem);

module.exports = router;
