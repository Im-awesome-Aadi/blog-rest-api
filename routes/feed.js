const express = require('express');
const {body} = require('express-validator')
//const isAuth = require('../route-protection/is-auth')
const feedController = require('../controllers/feed');

const router = express.Router();

// GET /feed/posts
router.get('/', feedController.getPosts);



module.exports = router;