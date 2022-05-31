const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');

module.exports = function () {
    router.get('/', UserController.getAllUser);
    router.post('/create', UserController.createUser);
    router.post('/validate', UserController.validateUser);
    return router;
}
