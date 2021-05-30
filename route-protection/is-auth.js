const jwt = require('jsonwebtoken')
module.exports=(req,res,next)=>{
    const token = req.get('Authorization')
    if(!token){
        return res.status(401).json({
            message :'Token Not present in header',
    
        })
    }
    let decodedToken
    try{
        decodedToken=jwt.verify(token,'mysecretkey')
    }
    catch(e){
        return res.status(401).json({
            message :'Invalid Token',
    
        })
    }

    if(!decodedToken){
        return res.status(401).json({
            message :'Invalid Token',
    
        })
    }

    req.userId = decodedToken.userId
    next()
}