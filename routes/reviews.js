const express = require('express');

// The methods we want from the reviews controller
const {
    getReviews
} = require("../controllers/reviews");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getReviews);

module.exports = router;