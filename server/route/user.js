var express = require('express');
var router = express.Router();
var blogDao = require('../model/blog.js');
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});
router.get('/getBlog', function(req, res) {
	blogDao.find({}, function(dbres){
		res.send({
			data:dbres,
			status:0,
			message:''
		});
	});

});

router.get('/getContent', function(req, res) {
	blogDao.find({title:req.query.title}, function(dbres){
		res.send({
			data:dbres[0],
			status:0,
			message:''
		});
	});

});

router.post('/addBlog', function(req, res) {
	if(req.session.user){
		blogDao.insert({
			title:req.body.title,
			content:req.body.content
		}, function(){
			res.send({
				data:'',
				status:0,
				message:''
			});
		});
	}else{
		res.send({
			data:'',
			status:2,
			message:'无访问权限，请登陆'
		});
	}
	
	
});

router.post('/delBlog', function(req, res) {
	if(req.session.user){
		blogDao.delete({
			title:req.body.title,
		}, function(){
			res.send({
				data:'',
				status:0,
				message:''
			});
		});
	}else{
		res.send({
			data:'',
			status:2,
			message:'无访问权限，请登陆'
		});		
	}
	
});

router.post('/editBlog', function(req, res) {
	if(req.session.user){
		blogDao.update({
			title:req.body.title,
		}, {'$set':{'content':req.body.content}},function(){
			res.send({
				data:'',
				status:0,
				message:''
			});
		});
	}else{
		res.send({
			data:'',
			status:2,
			message:'无访问权限，请登陆'
		});
	}
	
});

router.post('/login', function(req, res){
	let user = {
		username:req.body.username,
		password:req.body.password
	};
	if(user.username =='lidandan' && user.password == '11223344'){
		req.session.user = user;
		res.send({
			data:'',
			status:0,
			message:''
		});
	}else{
		res.send({
			data:'',
			status:1,
			message:'用户名或者密码错误！'
		})
	}
})

module.exports = router;