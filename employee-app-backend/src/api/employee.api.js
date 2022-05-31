const express = require('express');
const router = express.Router();
const EmployeeController = require('../controller/employee.controller');

module.exports = function () {
    router.get('/', EmployeeController.getAllEmployees);
    router.get('/:id', EmployeeController.getEmployeeById);
    router.post('/create', EmployeeController.createEmployee);
    router.put('/update/:id', EmployeeController.updateEmployee);
    router.delete('/delete/:id', EmployeeController.deleteEmployee);
    return router;
}
