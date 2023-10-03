const express =  require('express');
const router =  express.Router();
const authControllerController = require('../controllers/authController');

router.post('/', authController.handleLogin);

module.exports = router;
