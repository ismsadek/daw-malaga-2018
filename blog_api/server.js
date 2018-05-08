const express = require('express');
const faker = require('faker');
const jwt =  require('jsonwebtoken');
const bearerToken = require('express-bearer-token');
var fs = require('fs');


const app = express();	// Inicializamos express

app.use(express.urlencoded()) // MIDDLEWARE

// app.use(bearerToken());

// app.use(function(req, res, next){
// 	if(req.url == "/api/login"){
// 		next()
// 	} else{
// 			var token = req.token
// 			jwt.verify(token, superSecret, function(err, decoded){
// 				if(err){
// 					res.status(403).json({
// 						error: "Forbidden",
// 						description: "Forbidden"
// 					})
// 				}
// 			})
			
// 	}
// })

var postsData = [];
var superSecret = 'passwordsecreta'

for(var i = 0; i<10; i++){
	var item  = {
		id: faker.random.uuid(),
		title: faker.lorem.sentence(),
		description: faker.lorem.sentence(4)
	}
	postsData.push(item)
}


//  CREAMOS LAS RUTAS

// app.post('/api/login', function(req, res){
// 	var username = req.body.username
// 	var password = req.body.password
	
// 	if(username === "test" && password ==="test"){
// 		var payload = {
// 			admin: true,
// 			username: username
// 		};
// 		var token = jwt.sign(payload, superSecret, {
// 			expiresIn: '2 days'
// 		});
// 		res.json({
// 			token: token
// 		})
// 	}else{
// 		res.status(403).json({
// 			error: "Forbidden",
// 			description: "Forbidden"
// 		})
// 	}


// })

app.get('/api/posts', function(req, res){
	res.json(postsData)
})

app.get('/api/posts/:id', function(req, res){
		
		var id = req.params.id // te saca los parametros 'id' de la url
		var selected = postsData.filter( (item) => {return item.id === id} ) [0] || null
		if(selected){
			res.status(200).json(selected)
		} else {
			var errorJson = {
				error: "Not Found",
				description: "This item was not found",
				url: "http:://rutaaladocumentaciondelerror.com"
			}
			res.status(404).json(errorJson)
		}
		
})

app.delete('/api/posts/:id', function(req, res){
	var id = req.params.id
	// postsData = postsData.filter( (item) => {return item.id != id} )
	var index = postsData.findIndex((item) => {return item.id === id} )
	if(index == -1){
		res.status(404).json(errorJson)
	} else {
	postsData = postsData.splice(index,1)
	res.sendStatus(204)
	}

})

app.put("/api/posts/:id", function(req, res){ // put modifica unon existente y post crea uno nuevo
	var id = req.params.id
	var selected = postsData.filter( (item) => {return item.id === id} ) [0] || null
	if(selected){
		selected.title = req.body.title
		selected.description = req.body.description
		res.json(selected)
	} else{
		res.status(404).json(errorJson)
	}
})


app.post('/api/posts', function(req, res){
	var item  = {
		id: faker.random.uuid(),
		title: req.body.title,
		description: req.body.description
	}
	var file = JSON.stringify(item)

	fs.writeFileSync(item.id + ".json", file);
	postsData.push(item)
	res.status(201).json(item)	
})



// INICIAMOS EL SERVIDOR EN EL PUERTO 3000
app.listen(3000, function(){
	console.log('Servidor iniciado')
})

// hacer este comando 'npm i nodemon -D',
// cuando una persona reciba el proyecto haciendo npm start ya lo inciará