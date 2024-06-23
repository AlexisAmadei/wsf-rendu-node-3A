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
    const { userId, products } = req.body;
    try {
        const user = await userModel.getUserById(userId);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        for (const { productId, quantity } of products) {
            const product = await productModel.getProductById(productId);
            if (!product || product.stock < quantity) {
                return res.status(400).json({ error: 'Product not found or not enough stock' });
            }
        }
        const orderId = await ordersModel.createOrder(userId, products);
        res.json({ orderId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;