const express = require('express');

// The methods we want from the users controller
const {
    getUsers,
    postUser,
    deleteUser,
    getUser,
    putUser
} = require("../controllers/users");


const router = express.Router();

// The route and get/post/put/delete methods
router
    .route('/')
    .get(getUsers)
    .post(postUser)
    .put(putUser);

router
    .route('/:id')
    .get(getUser)
    .delete(deleteUser);

module.exports = router;