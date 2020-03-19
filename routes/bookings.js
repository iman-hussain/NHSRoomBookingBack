const express = require('express');

// The methods we want from the bookings controller
const {
    getBookings,
    getBooking,
    deleteBooking,
    postBooking
} = require("../controllers/bookings");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getBookings)
    .post(postBooking);

router
    .route('/:id')
    .get(getBooking)
    .delete(deleteBooking);
    
module.exports = router;