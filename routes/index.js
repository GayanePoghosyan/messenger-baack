const express = require('express');
const users = require('./users');
const router = express.Router();

/* GET home page. */
router.use('/users', users);

module.exports = router;
