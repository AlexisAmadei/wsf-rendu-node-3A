const express = require('express');
const authModel = require('../authBackend/authModel');
const userModel = require('../userBackend/userModel');

// Middleware to check if the user is an admin
async function isAdmin(req, res, next) {
    const { userId } = req.body;
    try {
        const user = await userModel.getUserById(userId);
        if (user && user.admin) {
            next();
        } else {
            res.status(403).json({ error: "Access denied, user not admin" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = isAdmin;