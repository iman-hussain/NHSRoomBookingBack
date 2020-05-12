/*
  Developed by Liam Penn - 1415065
  Set routes to handle the catering controller methods
*/

const express = require('express');

// The methods we want from the catering controller
const {
    getCaterings,
    getCatering,
    deleteCatering,
    postCatering,
    putCatering
} = require("../controllers/catering");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getCaterings)
    .post(postCatering)
    .put(putCatering);

router
    .route('/:id')
    .get(getCatering)
    .delete(deleteCatering);

module.exports = router;