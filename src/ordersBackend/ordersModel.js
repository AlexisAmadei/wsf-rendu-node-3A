const knex = require('knex')(require('../../knexfile')['development']);

// Get all orders
async function getAllOrders() {
  return await knex.select().from('orders');
}

// Get order by id
async function getOrderById(id) {
  return await knex('orders').where({ id }).first();
}

// Create order
async function createOrder(user_id, products) {
  const date = new Date().toISOString();
  let total_price = 0;

  // Calculate total price and check stocks
  for (const { productId, quantity } of products) {
    const product = await knex('products').where({ id: productId }).first();
    if (product.stock < quantity) {
      throw new Error('Not enough stock');
    }
    total_price += product.price * quantity;
  }

  // Deduct quantities from stocks
  for (const { productId, quantity } of products) {
    await knex('products').where({ id: productId }).decrement('stock', quantity);
  }

  // Create order
  const [orderId] = await knex('orders').insert({ user_id, products: JSON.stringify(products), total_price, date, status: 'pending' });
  return orderId;
}

// Update order status
async function updateOrderStatus(id, status) {
  return await knex('orders').where({ id }).update({ status });
}

// Delete order
async function deleteOrder(id) {
  return await knex('orders').where({ id }).del();
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder
};
