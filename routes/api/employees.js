const express = require('express');
const router = express.Router();
const path = require('path');
const employeeController =  require('../../controllers/employeesController');

//INTERSTING: params (in the url) vs body = (in the json body)

router.route('/')
    .get(employeeController.getAllEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);
router.route('/:id')
    .get(employeeController.getEmployee);
module.exports = router;
