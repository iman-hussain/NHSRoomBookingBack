const express = require('express');

// The methods we want from the users controller
const {
    getUsers
} = require("../controllers/users");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getUsers);

module.exports = router;