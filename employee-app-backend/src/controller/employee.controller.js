const Employee = require("../model/employee.model");

//Add New Employee
const createEmployee = async (req, res) => {
    if (req.body) {

        const employee = new Employee(req.body);

        await employee.save()
            .then(data => res.status(200).send({ data: data }))
            .catch(err => res.status(500).send(err));

    }
}

//update Employee Details
const updateEmployee = async (req, res) => {
    if (req.body) {
        if (!req.params.id) return res.status(500).send("Id is missing");
        let id = req.params.id;

        updateDetails(id, req, (err, employee) => {
            if (err) return res.status(500).send(err);
            res.status(200).send(employee);
        })
    }
}

function updateDetails(id, req, callback) {
    Employee.findByIdAndUpdate(id, req.body)
        .then((res) => {
            Employee.findOne({ _id: id }, (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    var employee = result;
                    console.log(employee);
                    return callback(null, employee);
                }
            });
        })
        .catch(err => {
            console.log(err)
            return callback(err);
        })
}

//get All Employees
const getAllEmployees = async (req, res) => {
    await Employee.find()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.send(error);
        });
}

//delete Employee
const deleteEmployee = async (req, res) => {
    if (req.params.id) {
        await Employee.findByIdAndDelete(req.params.id, (err, result) => {
            if (err) return res.status(500).send(err);
            console.log(result);
            return res.status(200).send(result);
        });
    }
}

//getEmployeeById
const getEmployeeById = async (req, res) => {
    await Employee.find({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result);
            console.log(result);
        }
    })
};

module.exports = {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployees,
    getEmployeeById
}