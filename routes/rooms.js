/*
  Developed by Liam Penn - 1415065
  Set routes to handle the rooms controller methods
*/

const express = require('express');

// The methods we want from the rooms controller
const {
    getRooms,
    getRoom,
    deleteRoom,
    postRoom,
    putRoom
} = require("../controllers/rooms");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getRooms)
    .post(postRoom)
    .put(putRoom);

router 
    .route('/:id')
    .get(getRoom)
    .delete(deleteRoom);

module.exports = router;