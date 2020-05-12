/*
  Developed by Liam Penn - 1415065
  Set routes to handle the bookings controller methods
*/

const express = require('express');

// The methods we want from the bookings controller
const {
    getBookings,
    getBooking,
    deleteBooking,
    postBooking,
    putBooking,
    getUserBookings,
    getBookingInfo
} = require("../controllers/bookings");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getBookings)
    .post(postBooking)
    .put(putBooking);

router
    .route('/:id')
    .get(getBooking)
    .delete(deleteBooking);
    
router
    .route('/user/:id')
    .get(getUserBookings);

router
    .route('/info/:id')
    .get(getBookingInfo);
    
module.exports = router;