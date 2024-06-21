// userRoutes.js
const express = require('express');
const router = express.Router();
const userModel = require('./userModel');
const md5 = require('md5');

// Récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer un utilisateur par ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Créer un nouvel utilisateur
router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  cryptPwd = md5(password);
  try {
    await userModel.createUser(name, email);
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un utilisateur
// Mettre à jour un utilisateur
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { currentEmail } = req.body;
  const { newName, newEmail, newPassword } = req.body;
  try {
    const user = await userModel.getUserByEmail(currentEmail);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    if (newEmail) {
      if (newEmail === user.email) {
        return res.status(400).json({ message: 'Wrong email changes' });
      } else {
        await userModel.updateUserEmail(id, newEmail);
      }
    }
    if (newName) {
      if (newName === user.name) {
        return res.status(400).json({ message: 'Wrong name changes' });
      } else {
        await userModel.updateUserName(id, newName);
      }
    }
    if (newPassword) {
      const cryptPwd = md5(newPassword);
      if (cryptPwd === user.password) {
        return res.status(400).json({ message: 'Wrong password changes' });
      } else {
        await userModel.updateUserPassword(id, cryptPwd);
      }
    }
    res.json({ message: 'Utilisateur mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un utilisateur
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.deleteUser(id);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get user orders
router.get('/users/:id/orders', async (req, res) => {
  try {
    const orders = await knex('orders').where({ user_id: req.params.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;