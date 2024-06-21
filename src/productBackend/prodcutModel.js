const knex = require('knex')(require('../../knexfile')['development']);

// get all products
async function getAllProducts() {
    return await knex.select().from('products');
}

// add a product
async function addProduct(name, price, stock) {
    return await knex('products').insert({ name, price, stock });
}

// delete a product
async function deleteProduct(id) {
    return await knex('products').where({ id }).del();
}

// update a product
async function updateProduct(id, newName, newPrice, newStock) {
    return await knex('products').where({ id }).update({ name: newName, price: newPrice, stock: newStock });
}

module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct
};