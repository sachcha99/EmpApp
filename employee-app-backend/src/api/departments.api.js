const express = require('express');
const router = express.Router();
const DepartmentsController = require('../controller/departments.controller');

module.exports = function () {
    router.get('/', DepartmentsController.getAllDepartments);
    router.post('/create', DepartmentsController.createDepartments);
    router.get('/:department', DepartmentsController.getDesignationsByDepartment);
    return router;
}
