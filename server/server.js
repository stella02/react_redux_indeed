const express = require('express');
//const utils = require('utility');
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser')

const userRouter = require('./user');

const app = express();


//app.use('/user', userRouter) SHOULD be defined AFTER app.use(bodyParser.json())
// otherwise, parser does not work
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', userRouter)
app.listen(9093, function(){
	console.log('node app start at port 9093')
})