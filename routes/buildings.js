const express = require('express');

// The methods we want from the buildings controller
const {
    getBuildings,
    postBuilding
} = require("../controllers/buildings");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getBuildings)
    .post(postBuilding);

module.exports = router;