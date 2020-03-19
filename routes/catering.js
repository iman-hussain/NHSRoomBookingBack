const express = require('express');

// The methods we want from the catering controller
const {
    getCaterings,
    getCatering,
    postCatering
} = require("../controllers/catering");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getCaterings)
    .post(postCatering);

router
    .route('/:id')
    .get(getCatering);

module.exports = router;