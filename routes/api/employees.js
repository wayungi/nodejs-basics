const express = require('express');
const router = express.Router();
const path = require('path');
const data = {};
// data.employees =  require('../../data/employees.json');
data.employees =  [
    {
        "id":10,
        "firstname": "Bilalo",
        "lastname": "Ampaire"
    },
    {
        id:11,
        firstanme: 'Ismail',
        lastname: 'Kizza'
    }
];
const {v4: uuid} = require('uuid');



//INTERSTING: params (in the url) vs body = (in the json body)

router.route('/')
// get all employees
    .get()
    .post()

// edit employee
    .put()

    .delete();

router.route('/:id')
    .get();
    






module.exports = router;
