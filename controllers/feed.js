const Post = require('../models/post')
const { validationResult } = require('express-validator');

exports.getPosts = (req, res, next) => {
  const currentPage = req.query.page || 1
    console.log("Requested received for showing the posts")

    Post.showFeed(currentPage)
    .then(post=>{
        res.status(200).json({
          message :"All posts found successfully",
            posts: post
          });
    }
    )
  };
  
