const express = require('express');
const {body} = require('express-validator')
const isAuth = require('../route-protection/is-auth')

const postController = require('../controllers/post');

const router = express.Router();

// POST /createPost
router.post('/createPost', [
    body('title','Title should contain atleast 8 characters').trim().isLength({min:8}),
    body('content','Content should contain atleast 8 characters').trim().isLength({min:8})
]
,isAuth,postController.createPost);

// POST /editPost
router.post('/editPost', [
    body('title','Title should contain atleast 8 characters').trim().isLength({min:8}),
    body('content','Content should contain atleast 8 characters').trim().isLength({min:8})

]
,isAuth,postController.editPost);

router.get('/post/:postId', postController.getPost)
router.post('/deletepost',isAuth, postController.deletePost)

module.exports = router;