const express = require('express');

// The methods we want from the catering controller
const {
    getCaterings,
    postCatering
} = require("../controllers/catering");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getCaterings)
    .post(postCatering);

module.exports = router;