const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
class Post {
  constructor(title, content, createdAt,userId) {
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.userId = userId;
  }

  savePost(){
    const db = getDb();
    return db.collection('posts').insertOne(this)
    .then(result=>{return result})
    .catch(err => {console.log(err)});
  }

  static showFeed(currentPage){
    const db = getDb();
   return db.collection('posts').find({})
     //.next()
     .skip((currentPage - 1) * 3)
     .limit(3)
     .toArray()
     
    .then(result=>{
        return result
    })
    .catch(err=>{console.log(err)})
  }


  static editPost(postId,updatedTitle, updatedContent){
    const db = getDb();
    return db.collection('posts').updateOne({_id:new mongodb.ObjectID(postId)},{$set:{
        title:updatedTitle,
        content:updatedContent,
    }, $push:{
        updatedTime:new Date().toISOString()
    } })
    .then(result=>{
        console.log("successfull")
    })
    .catch(err=>{console.log(err)})
  }

  static getPost(id){
    const db = getDb();
   return db.collection('posts').find({_id : new mongodb.ObjectID(id)})
   .next()
   .then(post=>{
     return post
   })
   .catch(err=>{console.log(err)})
  }

  static deletePost(id){
    const db = getDb();
   return db.collection('posts').deleteOne({_id : new mongodb.ObjectID(id)})
   .then(post=>{
     return post
   })
   .catch(err=>{console.log(err)})
  }
}

module.exports = Post