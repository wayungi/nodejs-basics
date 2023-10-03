const express = require('express');
const router = express.Router();
const path = require('path');
const data = {};

//INTERSTING: params (in the url) vs body = (in the json body)

router.route('/')

    .get()
    .post()
    .put()
    .delete();
router.route('/:id')
    .get();
module.exports = router;
