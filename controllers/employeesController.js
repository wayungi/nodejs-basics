const {v4: uuid} = require('uuid');
const data = {
    employees: require('../model/employees.json'),
    setEmployees: (data) => this.employees = data
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
    res.json(newEmployee)
}

const updateEmployee = (req, res) => {
    let index = data.employees.findIndex((item) => item.id === req.body.id);
    if(index !== -1){
        const updatedUser = {
            'id': req.body.id,
            'firstname': req.body.firstname,
            'lastname': req.body.lastname
        }
        data.employees[index] = updatedUser
        res.json(updatedUser);
    }else {
        res.json({"error": "user not found"})
    }
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