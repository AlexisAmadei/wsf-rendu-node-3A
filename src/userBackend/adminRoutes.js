const express = require('express');
const knex = require('../../knexfile')
const router = express.Router();

router.get('/orders', async (req, res) => {
    try {
        const orders = await knex('orders').select();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;