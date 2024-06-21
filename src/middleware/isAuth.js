const express = require('express');
const authModel = require('../authBackend/authModel');


// middleware for authentication
async function isAuthenticated(req, res, next) {
    try {
        const authId = req.headers.authorization;
        console.log('authId:', authId);
        if (!authId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const authRecord = await authModel.getAuthById(authId);
        console.log('authRecord:', authRecord);
        if (!authRecord) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = authRecord.userId;
        console.log('userId:', req.userId);
        next();
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = isAuthenticated;