const express = require('express');

// The methods we want from the rooms controller
const {
    getRooms
} = require("../controllers/rooms");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getRooms);

module.exports = router;