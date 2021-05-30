const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;
const helmet = require('helmet')
const compression = require('compression')
const feedRoutes = require('./routes/feed');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

const app = express();

app.use(helmet())
app.use(compression())
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    next()
})


app.use('/feed', feedRoutes);
app.use('/', postRoutes);
app.use('/auth', authRoutes);
app.use('/',(req,res,next)=>{
    return res.status(404).json({
        message : "Page not found"
    })
})
mongoConnect(()=>{
    app.listen(process.env.PORT || 3000 ,()=>{
        console.log("Started at port 8080")
    });
})