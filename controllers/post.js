const Post = require('../models/post')
const User = require('../models/user')
const { validationResult } = require('express-validator');
  exports.temp=(req,res,next)=>{
    User.deletePost("60b34a877f6b9024306d4dc6","60b3628d753d5c0eec125aab")
    .then(
        res.status(200).json({message :"Deleted successfully",})
   )
  }
  exports.createPost = async(req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const errors = validationResult(req)
    if(!errors.isEmpty())  return res.status(400).json({message : errors.array()[0].msg})    // Some error in validation
    const post = new Post(title,content,new Date().toISOString(),req.userId)
    const postSaved = await post.savePost()
    await  User.addPost(req.userId,postSaved.insertedId)   
    return res.status(201).json({message: 'Post created successfully!', post: { id: postSaved.insertedId, title: title, content: content }})         
    
    //.catch(()=>res.status(401).json({message: 'Post cannot be created'}))    
  };


  exports.editPost = async(req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const postId = req.body.postId;
    const errors = validationResult(req)
    if(!errors.isEmpty())  return res.status(400).json({message : errors.array()[0].msg})    // Some error in validation
    
    if(postId.match(/^[0-9a-fA-F]{24}$/)){
    const post = await Post.getPost(postId)
    if(!post) return res.status(404).json({message: "Could not find the post"});   // No post exist with this postId
        else
         {
            if(post.userId!==req.userId) return res.status(401).json({message: 'Post does not belong to you'})   // Post does not belong to this user
            else
                {
                    console.log("post belong to this user")
                    await Post.editPost(postId,title,content)                
                    return res.status(201).json
                    ({
                        message: 'Post Edited successfully!',
                        post: { title: title, content: content }
                    })     
                }
         }
        
    
   // .catch(err=>res.status(401).json({message: 'Post cannot be edited! might be database issue'}))
}
    else return res.status(404).json({message: "Invalid ID"});       
}

exports.getPost=async(req,res,next)=>{
    const postId = req.params.postId
    if (postId.match(/^[0-9a-fA-F]{24}$/)) {
    const post = await Post.getPost(postId)
    if(!post) return res.status(404).json({message: "Could not find the post"}); // No post exist with this postId    
    return res.status(200).json({message :"found successfully",posts: post});
    
    //.catch(err=>console.log(`err ${err}`))
    }
    else return res.status(404).json({message: "Invalid ID"}); 
    
}

exports.deletePost = async(req,res,next)=>{
    const postId = req.body.postId
    if (postId.match(/^[0-9a-fA-F]{24}$/)) {
        const post = await Post.getPost(postId)
        if(!post) return res.status(404).json({message: "Could not find the post"});   // No post exist with this postId
        else
            {
                if(post.userId!==req.userId) return res.status(401).json({message: 'Post does not belong to you'})   // Post does not belong to this user
                else
                {
                    await Post.deletePost(postId)
                    const user =await User.findById(req.userId,postId)
                    await User.deletePost(req.userId,postId)
                    return res.status(200).json({message :"Deleted successfully",})       
                }
            }
        
    //.catch(err=>console.log(`err ${err}`))
    } 
    else return res.status(404).json({message: "Invalid ID"}); 
}
