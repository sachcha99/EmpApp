const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    employeeId: { type: String, required: true ,unique:true},
    nic: { type: String, required: true },
    address: { type: Array, required: true },
    mobile: { type: Array, required: true },
});

const Employee = mongoose.model('employee', EmployeeSchema);
module.exports = Employee;