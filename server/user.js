const express = require('express')
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const _filter = {'pwd':0, '_v':0} // dont show pwd and _v

Router.post('/login',function(req, res){
	const {user,pwd}=req.body
	User.findOne({user, pwd:md5Pwd(pwd)},_filter, function(err, doc){
		if(!doc){
			return res.json({code:1, msg:'user or pwd error'})
		}
		res.cookie('userid', doc._id)
		return res.json({code:0, data:doc})
	})
	
})
Router.post('/update', function(req,res){
	const userid=req.cookies.userid
	if(!userid){
		return res.dump({code:1})
	}
	const body = req.body
	User.findByIdAndUpdate(userid, body, function(err, doc){
		const data = Object.assign({},{
			user: doc.user,
			type:doc.type
		}, body)
		return res.json({code:0, data})
	})
})

Router.post('/register',function(req, res){
	//console.log(req.body)
	
	const {user,pwd,type}=req.body
	User.findOne({user},function(err,doc){
		if(doc){
			return res.json({code: 1, msg:'user exist'})
		}else{
			const userModel = new User({user,type,pwd:md5Pwd(pwd)})
			userModel.save(function(e,d){
				if(e){
					return res.json({code:1, msg:'backend has issue'})
				}
				const {user, type, _id}=d 
				res.cookie('userid', _id)
				return res.json({code:0, data:{user, type,_id}})
			})
			/*User.create({user,type, pwd:md5Pwd(pwd)}, function(e,d){
				if(e){
					return res.json({code:1, msg:"error in backend"})
				}
				return res.json({code: 0})
			})*/
		}
	})
})

// To get the info from req: get=> req.query, post=> req.body

Router.get('/list', function(req, res){
	//User.remove({},function(e,d){})
	const {type} = req.query
	User.find({type}, function(err, doc){
		return res.json({code:0, data:doc})
	})
})
Router.get('/info', function(req, res){
	const {userid}=req.cookies
	if(!userid){
		return res.json({code:1})
	}
	User.findOne({_id: userid},_filter,function(err,doc){
		if(err){
			return res.json({code:1, msg:'error in backend'})
		}
		if(doc){
			return res.json({code: 0, data: doc})
		}
	})
	
})

function md5Pwd(pwd){
	const salt='imooc_is_good_123@666'
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router