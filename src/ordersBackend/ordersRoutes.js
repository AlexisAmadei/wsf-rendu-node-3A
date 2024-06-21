const express = require('express');
const router = express.Router();
const productModel = require('../productBackend/prodcutModel');
const userModel = require('../userBackend/userModel');
const ordersModel = require('../ordersBackend/ordersModel');
const isAuthenticated = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

// Get all orders
router.get('/all', isAdmin, async (req, res) => {
    const { userId } = req.body;
    try {
        const orders = await ordersModel.getAllOrders(userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get order by id
router.get('/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const order = await ordersModel.getOrderById(id);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create order
router.post('/new', isAuthenticated, async (req, res) => {
    const { products } = req.body;
    const user_id = req.user.id;
    try {
        const orderId = await ordersModel.createOrder(user_id, products);
        res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;