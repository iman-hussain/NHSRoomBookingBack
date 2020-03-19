const express = require('express');

// The methods we want from the buildings controller
const {
    getBuildings,
    getBuilding,
    deleteBuilding,
    postBuilding
} = require("../controllers/buildings");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getBuildings)
    .post(postBuilding);

router
    .route('/:id')
    .get(getBuilding)
    .delete(deleteBuilding);

module.exports = router;