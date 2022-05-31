const mongoose = require("mongoose");

const DepartmentsSchema = new mongoose.Schema({
    department: { type: String, required: true },
    designations: { type: Array, required: true },

});

const Departments = mongoose.model('departments', DepartmentsSchema);
module.exports = Departments;