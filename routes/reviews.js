const express = require('express');

// The methods we want from the reviews controller
const {
    getReviews,
    postReview
} = require("../controllers/reviews");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getReviews)
    .post(postReview);

module.exports = router;