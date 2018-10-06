const express = require('express');
const mongoose = require('mongoose');
// connect to mongo and use files under imooc
const DB_URL = 'mongodb://localhost:27017/imooc';

mongoose.connect(DB_URL);

// or you can use mongoose.conection.once('open', function(){}).on('error', function(err){})
mongoose.connection.on('connected', function(){
	console.log('mongo connect success')
});

// as table in mysql, mongodb has schema , model

const User = mongoose.model('user', new mongoose.Schema({
	user : {type: String, require: true},
	age : {type: Number, require: true}
	
}));
// add a new data
/*User.create({
	user:'xiaoming',
	age: 10
},function(err, doc){
	if(!err){
		console.log(doc)
	}else{
		console.log(err)
	}
} ); */

//remove data
User.remove({_id: "5b899a9082163506c4dc864b"}, function(err, doc){
	console.log(doc)
}) 

//
User.update({user: 'xiaoming'},{'$set': {age: 26}}, function(err, doc){
	console.log(doc)
})

//creat app
const app = express();

app.get('/', function(req, res){
	//console.log("hello from server.js console");
	res.send('<h1>HELLO WORLD</h1>');
	
});

app.get('/data', function(req, res){
	User.find({}, function(err, doc){
		res.json(doc);
	})
	//res.json({name: 'imooc app nodemon', type:'IT'});
});

app.listen(9093, function(){
	console.log('node app start at port 9093')
})