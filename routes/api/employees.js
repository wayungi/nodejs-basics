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
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        const user = {
            "id": req.body.id,
            'firstname': req.body.firstname,
            'lastname': req.body.lastname
        }
        data.employees.push(user);
        res.json(user)
    })

// edit employee
    .put((req, res) => {
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
        
    })
    .delete((req, res) => {
        res.json({"id": req.body.id})
    });

router.route('/:id')
    .get((req, res) => {
        res.json({"id": req.params.id})
    });
    






module.exports = router;
