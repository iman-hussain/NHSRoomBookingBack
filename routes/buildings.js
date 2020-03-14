const express = require('express');

// The methods we want from the buildings controller
const {
    getBuildings
} = require("../controllers/buildings");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getBuildings);

module.exports = router;