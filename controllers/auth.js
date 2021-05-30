const User = require('../models/user')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
exports.signup=(req,res,next)=>{
    const error = validationResult(req)
    if(!error.isEmpty()) return res.status(422).json({message : error.array()[0].msg,})  // In case validation failed
  
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email

    User.findByEmail(email)
    .then(userDoc=>{
      if(userDoc) return res.status(422).json({message : "Account already exists"})   // Account also exists. No need to signup
      
      return bcrypt.hash(password,12).then(hashed=>{
        const user = new User(email,name,hashed,[])
        return user.save()
        .then(result=>{return res.status(422).json({message : "Account created successfully",userId : result.insertedId})
        })
      })
      
    }) 
    .catch(err=>console.log(err))

}


exports.login=(req,res,next)=>{
  const error = validationResult(req)
  if(!error.isEmpty()) return res.status(422).json({message : error.array()[0].msg,})  // In case validation failed

  const password = req.body.password
  const email = req.body.email  
  let loadedUser;
  User.findByEmail(email)
  .then(user=>{
    if(!user) return res.status(404).json({message :'Account does not exist. Sign Up'})   // Need to sign up first
    
    loadedUser =user;
    return bcrypt.compare(password,user.password)
  })
  .then(
    isMatched=>{
      if(!isMatched) return res.status(401).json({message :'Incorrect Password'})   // Incorrect Password
      
      const token =jwt.sign({
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'mysecretkey',
        {expiresIn:'1h'
      });
      
      return res.status(200).json({
        message:'Token generated successfully',
        token:token,
        userId:loadedUser._id.toString() })
    }
  )
  .catch(err=>console.log(err))
  
}