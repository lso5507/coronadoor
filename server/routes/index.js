const express = require('express')
const router = express.Router();
const net = require('net');
const check = require('./check')
const login = require('./login')

router.use('/login',login)
router.use('/check',check);





module.exports = router;