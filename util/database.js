const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback)=>{
MongoClient.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zscnr.mongodb.net/${process.env.DATABASE}`)
.then(client=>{
    console.log('Connected to Datebase!')
    _db=client.db()
    callback()
})
.catch(err=>{
    console.log(`error is ${err}`)

    throw err;
});
}
const getDb=()=>{
    if(_db){
        return _db;
    }
    throw 'No database found'
}

exports.mongoConnect = mongoConnect
exports.getDb=getDb