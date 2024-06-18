const knex = require('knex')(require('../../knexfile')['development']);
const userModel = require('../userBackend/userModel');

async function createAuth(id, cryptPwd) {
    const user = await userModel.getUserById(id);
    const date = new Date();
    let auth = undefined;

    if (user && cryptPwd === user.password) {
        await deleteAuthByUserId(user.id);
        auth = await knex('auth').insert({ user_id: user.id, date: date });
        return auth;
    } else if (user && cryptPwd !== user.password) {
        throw new Error('Password incorrect');
    } else {
        throw new Error('User not found');
    }
}

async function deleteAuthByUserId(user_id) {
    return await knex('auth').where({ user_id }).del();
}

async function deleteAuthById(id) {
    return await knex('auth').where({ id }).del();
}

async function getAuthById(authId) {
    return await knex('auth').where({ user_id: authId }).first();
}

module.exports = {
    createAuth,
    deleteAuthByUserId,
    deleteAuthById,
    getAuthById
};