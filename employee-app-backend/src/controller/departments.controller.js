const Departments = require("../model/departments.model");

//Add New Departments
const createDepartments = async (req, res) => {
    if (req.body) {

        const data = {
            department: req.body.department,
            designations: req.body.designations,

        }
        const departments = new Departments(data);

        await departments.save()
            .then(data => res.status(200).send({ data: data }))
            .catch(err => res.send(err));

    }
}

//get All Departments
const getAllDepartments = async (req, res) => {
    await Departments.find()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.send(error);
        });
}

//get Designations By Department
const getDesignationsByDepartment = async (req, res) => {
    await Departments.find({ department: req.params.department }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result[0].designations);
            console.log(result);
        }
    })
};

module.exports = {
    createDepartments: createDepartments,
    getDesignationsByDepartment: getDesignationsByDepartment,
    getAllDepartments: getAllDepartments,
}