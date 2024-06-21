// productRoute.js
const express = require('express');
const router = express.Router();
const productModel = require('./prodcutModel');

// Récupérer tous les produits
router.get('/all', async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ajouter un produit
router.post('/add', async (req, res) => {
    const { name, price, stock } = req.body;
    try {
        const allProducts = await productModel.getAllProducts();
        const productExists = allProducts.find(product => product.name === name);
        if (productExists) {
            return res.status(400).json({ error: "Product already exists" });
        } else if (price < 0 || stock < 0) {
            return res.status(400).json({ error: "Price and stock must be greater than 0" });
        } else if (typeof price !== 'number' || typeof stock !== 'number') {
            return res.status(400).json({ error: "Price and stock must be numbers" });
        } else if (typeof name !== 'string') {
            return res.status(400).json({ error: "Name must be a string" });
        }
        const product = await productModel.addProduct(name, price, stock);
        res.json("Product added successfully with id " + product.id);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer un produit
router.delete('/delete/:id', async (req, res) => {
    id = req.params.id;
    try {
        const product = await productModel.deleteProduct(id);
        res.json("Product with id " + id + " deleted successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour un produit
router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const { name, price, stock } = req.body;
    try {
        const product = await productModel.updateProduct(id, name, price, stock);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;