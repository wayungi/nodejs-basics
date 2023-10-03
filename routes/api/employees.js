const express = require('express');
const router = express.Router();
const path = require('path');
const data = {};

//INTERSTING: params (in the url) vs body = (in the json body)

router.route('/')
    .get(getAllEmployees())
    .post(createNewEmployee())
    .put(updateEmployee())
    .delete(deleteEmployee());
router.route('/:id')
    .get(getEmployee());
module.exports = router;
