const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User{
    constructor(email,name,password,posts){
        this.email=email
        this.name=name
        this.password=password
        this.posts = posts
        this.joinedOn = new Date().toISOString()
    }
    save(){
        const db = getDb();
        return db.collection('users').insertOne(this)   
        .then(user=>{return user})
        .catch(err=>{console.log(err)})
    }

    static addPost(userId,postId){
        const db = getDb();
        return db.collection('users').updateOne({_id:new mongodb.ObjectID(userId)},
        {
            $push:{
                posts : postId
            }
        })
        .then(
            ()=>{
                console.log("Post added to user model")
                console.log(postId)
                return postId
            }
        ) 
        .catch(err=>{console.log(err)})
    }
    static findById(userId) {
      
        const db = getDb();
        return db
          .collection('users')
          .find({ _id: new mongodb.ObjectID(userId) })
          .next()
          .then(user => {return user;})
          .catch(err => {console.log(err)});
      }

    static findByEmail(email) {
      
        const db = getDb();
        return db
          .collection('users')
          .find({ email:email })
          .next()
          .then(user => {return user})
          .catch(err => {console.log(err)})}

    static deletePost(userId,postId){
        const db = getDb();
        return db.collection('users').findOne({_id: new mongodb.ObjectID(userId)})
        .then(
            user=>{
                var filtered = user.posts.filter(function(value){ 
                    return value.toString()!==postId;
                });
                return filtered
            }
        )
        .then(
            (newArray)=>{
                return db.collection('users').updateOne({_id: new mongodb.ObjectID(userId)},{$set:{posts:newArray}})
                    .then(
                        ()=>{console.log(userId)}
                        )
                }
            ) 
        .catch(err=>{console.log(err)})
        
    }
}

module.exports = User
