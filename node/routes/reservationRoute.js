const express = require('express');
const router = express.Router();
const c = require('../controllers/reservationController');


router.get('/getDistinctStatusWithCount', c.getDistinctStatusWithCount);
router.get('/getMultipleCounters', c.getMultipleCounters);
router.get('/getBookingMediumCounters', c.getBookingMediumCounters);
router.get('/getPeoplesCountYearly', c.getPeoplesCountYearly);
router.get('/getPeoplesCountMonthly', c.getPeoplesCountMonthly);


module.exports = router;