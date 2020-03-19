const express = require('express');

// The methods we want from the users controller
const {
    getUsers,
    postUser,
    getUser
} = require("../controllers/users");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getUsers)
    .post(postUser);

router
    .route('/:id')
    .get(getUser);

module.exports = router;