const express = require('express');
const router = express.Router();

router.use('/reservation', require('./reservationRoute'));


module.exports = router; 