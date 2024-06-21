// npm install knex sqlite3
const knex = require('knex')(require('../../knexfile')['development']);

// Create
async function createUser(name, email, password) {
  return await knex('users').insert({ name, email, password });
}

// Read
async function getAllUsers() {
  return await knex.select().from('users');
}

async function getUserById(id) {
  return await knex('users').where({ id }).first();
}

async function getUserByEmail(email) {
  return await knex('users').where({ email }).first();
}

// Update
async function updateUser(id, newName, newEmail, admin) {
  return await knex('users').where({ id }).update({ name: newName, email: newEmail, admin: admin});
}

async function updateUserPassword(id, newPassword) {
  return await knex('users').where({ id }).update({ password: newPassword });
}

async function updateUserEmail(id, newEmail) {
  return await knex('users').where({ id }).update({ email: newEmail });
}

async function updateUserName(id, newName) {
  return await knex('users').where({ id }).update({ name: newName });
}

// Delete
async function deleteUser(id) {
  return await knex('users').where({ id }).del();
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  updateUserPassword,
  updateUserEmail,
  updateUserName,
  deleteUser
};
