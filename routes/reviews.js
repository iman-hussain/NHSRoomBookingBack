const express = require('express');

// The methods we want from the reviews controller
const {
    getReviews,
    getReview,
    deleteReview,
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
    .get(getReview)
    .delete(deleteReview);

module.exports = router;