const express = require('express');
const faker = require('faker');
const server  = express();
const bodyParser = require('body-parser')
const bearerToken = require('express-bearer-token');
const jwt = require('jsonwebtoken');

let posts = [];

for (var i = 0; i < 10; i++) {
	var item = {
		id : i,
		title: faker.name.title(),
		description: faker.lorem.paragraph()
	}
	posts.push(item)
}


server.get('/', function (req, res) {
res.send('Hola mundo') // send es para mandar textos, para mandar json se hace con json
})

server.get('/api/posts', function (req, res) {
res.json(posts)				// aqui lanzamos un json
})

// server.get('/api/posts/:id', function(req, res){
// 	var id = req.params.id
// 	var postSearched = posts.filter((item)=>{return item.id == id}) [0] || null
// 	if(postSearched){
// 		res.status(200).json(postSearched)
// 	} else {
// 			var fail = {
// 			error: 'Not found',
// 			description: 'Not found'
// 		}
// 		res.status(404).json(fail)
// 	}
// })

server.get('/api/login/', function(req, res){

})

server.use(function(req, res, next) {
  var token = req.token
  if (token) {
    jwt.verify(token, app.get('tokenSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
});

var payload = { 
	admin: true,
	name: 'test'
};
var token = jwt.sign(payload, 'test', {
	expiresIn: '10 seconds'
});

server.listen(3000, function () {
console.log('Servidor activo en http://localhost:3000!')
})