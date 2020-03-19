const express = require('express');

// The methods we want from the reviews controller
const {
    getReviews,
    getReview,
    postReview
} = require("../controllers/reviews");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getReviews)
    .post(postReview);

router
    .route('/:id')
    .get(getReview);

module.exports = router;