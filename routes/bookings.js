const express = require('express');

// The methods we want from the bookings controller
const {
    getBookings
} = require("../controllers/bookings");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getBookings);

module.exports = router;