const knex = require('knex')(require('./knexfile')['development']);

async function createTable() {
  try {
    const userExist = await knex.schema.hasTable('users');
    const authExist = await knex.schema.hasTable('auth');
    const productsExist = await knex.schema.hasTable('products');
    const ordersExist = await knex.schema.hasTable('orders');
    if (!userExist) {
      await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.string('password');
        table.boolean('admin').defaultTo(false);
        table.orders('orders').defaultTo({});
      });
      console.log('La table "users" a été créée avec succès.');
    } else {
      console.log('La table "users" existe déjà.');
    }
    if (!authExist) {
      await knex.schema.createTable('auth', table => {
        table.increments('id').primary();
        table.integer('user_id');
        table.date('date').defaultTo(knex.fn.now());
      });
      console.log('La table "auth" a été créée avec succès.');
    } else {
      console.log('La table "auth" existe déjà.');
    }
    if (!productsExist) {
      await knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name');
        table.integer('price');
        table.integer('stock');
      });
    } else {
      console.log('La table "products" existe déjà.');
    }
    if (!ordersExist) {
      await knex.schema.createTable('orders', table => {
        table.increments('id').primary();
        table.integer('order_id');
        table.date('date').defaultTo(knex.fn.now());
        table.integer('user_id');
        table.json('products');
        table.integer('total_price');
        table.string('status').defaultTo('pending');
      });
    } else {
      console.log('La table "orders" existe déjà.');
    }
  } catch (error) {
    console.error('Erreur lors de la création de la table :', error);
  } finally {
    await knex.destroy();
  }
}

createTable();