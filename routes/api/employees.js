const express = require('express');
const router = express.Router();
const path = require('path');
const data = {};
// data.employees =  require('../../data/employees.json');
data.employees =  [];
const {v4: uuid} = require('uuid');



//INTERSTING: params (in the url) vs body = (in the json body)

router.route('/')
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

    .put((req, res) => {
        const updatedUser = {
            'id': req.body.id,
            'firstname': req.body.firstname,
            'lastname': req.body.lastname
        }
        
        let user = data.employees.filter((item) => item.id === req.body.id);
        if(user){
            user = updatedUser;
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
