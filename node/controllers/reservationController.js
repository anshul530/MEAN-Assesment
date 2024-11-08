 
const reservationService = require("../services/resvervationService");

const getDistinctStatusWithCount = async (req, res) => {
  try {
    const result = await reservationService.getDistinctStatusWithCount();
    return res.json({status:200,data:result});
  } catch (error) {
    res.json({status:500,error:error.message});
  }
};

const getMultipleCounters = async (req, res) => {
  try {
    const result = await reservationService.getMultipleCounters();
    return res.json({status:200,data:result[0]});
  } catch (error) {
    res.json({status:500,error:error.message});
    throw error;
  }
};

const getBookingMediumCounters = async (req, res) => {
  try {
    const result = await reservationService.getBookingMediumCounters();
    res.json({status:200,data:result[0]});
  } catch (error) {
    res.json({status:500,error:error.message});
    throw error;
  }
};

const getPeoplesCountYearly = async (req, res) => {
  try {
    const result = await reservationService.getPeoplesCountYearly();
    res.json({status:200,data:result});
  } catch (error) {
    res.json({status:500,error:error.message});
  }
};

const getPeoplesCountMonthly = async (req, res) => {
  try {
    const result = await reservationService.getPeoplesCountMonthly();
    res.json({status:200,data:result});
  } catch (error) {
    res.json({status:500,error:error.message});
  }
};


module.exports = {
  getDistinctStatusWithCount,
  getMultipleCounters,
  getBookingMediumCounters,
  getPeoplesCountYearly,
  getPeoplesCountMonthly
};
