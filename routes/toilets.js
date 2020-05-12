/*
  Developed by Liam Penn - 1415065
  Set routes to handle the toilets controller methods
*/

const express = require('express');

// The methods we want from the toilets controller
const {
    getToilets,
    getToilet,
    deleteToilet,
    postToilet,
    putToilet
} = require("../controllers/toilets");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getToilets)
    .post(postToilet)
    .put(putToilet);

router  
    .route('/:id')
    .get(getToilet)
    .delete(deleteToilet);

module.exports = router;