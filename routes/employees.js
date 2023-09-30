const express = require('express');
const router = express.Router();
const path = require('path');

router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        res.json({
            'firstname': req.body.firstname,
            'lastname': req.body.lastname
        })
    })
    






module.exports = router;
