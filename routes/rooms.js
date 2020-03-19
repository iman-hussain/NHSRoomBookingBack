const express = require('express');

// The methods we want from the rooms controller
const {
    getRooms,
    getRoom,
    postRoom
} = require("../controllers/rooms");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getRooms)
    .post(postRoom);

router 
    .route('/:id')
    .get(getRoom);

module.exports = router;