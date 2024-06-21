const express = require('express');
const router = express.Router();
const productModel = require('../productBackend/prodcutModel');
const userModel = require('../userBackend/userModel');
const ordersModel = require('../ordersBackend/ordersModel');
const isAuthenticated = require('../middleware/isAuth');

// commande multi produit
router.post('/orders', isAuthenticated, async (req, res) => {
    try {
        const { user_id, products } = req.body;
        const date = new Date().toISOString();
        let total_price = 0;

        // Calculer le prix total et vérifier les stocks
        for (const { productId, quantity } of products) {
            const product = await knex('products').where({ id: productId }).first();
            if (product.stock < quantity) {
                return res.status(400).json({ error: 'Not enough stock' });
            }
            total_price += product.price * quantity;
        }

        // Déduire les quantités des stocks
        for (const { productId, quantity } of products) {
            await knex('products').where({ id: productId }).decrement('stock', quantity);
        }

        // Créer la commande
        const [orderId] = await knex('orders').insert({ user_id, products: JSON.stringify(products), total_price, date, status: 'pending' });
        res.status(201).json({ orderId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// export
module.exports = router;