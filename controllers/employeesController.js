const {v4: uuid} = require('uuid');
const data = {
    employees: require('../model/employees.json'),
    setEmployees: function(data){this.employees = data}
   };

// data.employees =  require('../../data/employees.json');
// data.employees =  [
//     {
//         "id":10,
//         "firstname": "Bilalo",
//         "lastname": "Ampaire"
//     },
//     {
//         id:11,
//         firstanme: 'Ismail',
//         lastname: 'Kizza'
//     }
// ];

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {

    if(!req.body.firstname || !req.body.lastname) {
        return res.status(400).json({"error": "Fill in first & last name"})
    }

    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(newEmployee)
}

const updateEmployee = (req, res) => {
    const employeeToUpdate = data.employees.find((employee) => emplooyee.id === req.body.id)

    if(!employeeToUpdate) {
        return res.status(400).json({"error": `Eployee with id ${req.body.id} could not be found`})
    }

    if(req.body.firstname) employeeToUpdate.firstname = req.body.firstname
    if(req.body.lastname) employeeToUpdate.lasstname = req.body.lastname

    const filteredEmployees = data.employees.filter((employee) => employee.id !== +req.body.id);
    const unsortedEmpoyees = [...filteredEmployees, employeeToUpdate]
    data.setEmployees(unsortedEmpoyees.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0 ));
    res.json(data.employees)
}

const deleteEmployee  = (req, res) => {
    const userToDelete = data.employees.find((user) => user.id === req.body.id);
    data.employees = data.employees.filter((user) => user.id !== req.body.id)
    res.json(userToDelete)
}

const getEmployee = (req, res) => {
    const user = data.employees.find((user) => user.id === +req.params.id);
    if(user) {
        res.json(user)
    }else {
        res.json({"error": "user not found"})
    }
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}