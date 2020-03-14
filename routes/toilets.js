const express = require('express');

// The methods we want from the toilets controller
const {
    getToilets
} = require("../controllers/toilets");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getToilets);

module.exports = router;