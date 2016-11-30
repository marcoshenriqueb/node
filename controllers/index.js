var express = require('express');
var router = express.Router();

router.use('/', require('./HomeController'))

module.exports = router
