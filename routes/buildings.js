/*
  Developed by Liam Penn - 1415065
  Set routes to handle the buildings controller methods
*/

const express = require('express');

// The methods we want from the buildings controller
const {
    getBuildings,
    getBuilding,
    deleteBuilding,
    postBuilding,
    putBuilding
} = require("../controllers/buildings");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getBuildings)
    .post(postBuilding)
    .put(putBuilding);

router
    .route('/:id')
    .get(getBuilding)
    .delete(deleteBuilding);

module.exports = router;