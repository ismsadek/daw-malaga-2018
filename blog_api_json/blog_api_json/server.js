const express = require("express");
const faker = require("faker"); 
const jwt = require('jsonwebtoken');
const bearerToken = require('express-bearer-token');
const fs = require("fs")

const app = express();

const superSecret = "miclavesupersecretaquenadieadivina"

app.use(express.urlencoded())
app.use(bearerToken());

app.use(function(req,res,next){
  if(req.url=="/api/login"){
    next()
  }else{
    var token = req.token
    jwt.verify(token, superSecret, function(err, decoded) {
      if(err){
        res.status(403).json({
          error: "Forbidden",
          description: "Forbidden"
        })
      }else{
        next()
      }
    })
  }
})

var postsData = []

var errorJson = {
  error: "Not Found",
  description: "This item was not found",
  url: "http:://rutaaladocumentaciondelerror.com"
}

for(var i = 0;i<10;i++){
  var item = {
    id: faker.random.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(4) 
  }
  postsData.push(item)
}

app.post("/api/login", function(req, res){
  var username = req.body.username
  var password = req.body.password

  if (username==="test" && password==="test"){

    var payload = {
      admin: true,
      username: username
    };
    var token = jwt.sign(payload, superSecret, {
      expiresIn: "20 days"
    });

    res.json({
      token:token
    })

  }else{
    res.status(403).json({
      error: "Forbidden",
      description: "Forbidden"
    })
  }
})

app.get("/api/posts", function(req, res){
  var postData = [];
  var path = "data/"
  fs.readdirSync(path).forEach(file => {       // busca en la ruta mediante un forEach 
    var item = JSON.parse(fs.readFileSync(path + file));
    postData.push(item)
  })
  res.json(postData);
})

app.get("/api/posts/:id", function(req, res){
  
  var path = "data/" + req.params.id + ".json"
  var selected = JSON.parse(fs.readFileSync(path, "utf8"));
  if (selected) {
    res.json(selected)
  }else{
    res.status(404).json(errorJson)
  }
})

app.post("/api/posts", function(req, res){
  var id = faker.random.uuid();
  var item = {
    id: id,
    title: req.body.title,
    description: req.body.description
  }
  var path = "data/" + id + ".json";  // la carpeta data se crea antes manualmente
  
  fs.writeFileSync(path, JSON.stringify(item))  // coge el objeto y lo guarda como strings en foma de JSON en el fichero
  res.status(201).json(item)

})

app.put("/api/posts/:id", function(req, res){
  var path = "data/" + req.params.id + ".json";   //  buscamos el fichero segun la id
  var selected = JSON.parse(fs.readFileSync(path, "utf8")); // el parse es el metodo opuesto a stringify de strings type-->JSON type
  selected.title = req.body.title
  selected.description = req.body.description
  fs.writeFileSync(path, JSON.stringify(selected))
  res.json(selected)
})

app.delete("/api/posts/:id", function(req, res){
  var id = req.params.id
  //postsData = postsData.filter( (item) => { return item.id != id } )
  var path = "data/" + id + ".json";
  fs.unlinkSync(path) // metodo de fileSystem que borra el fichero a traves de la ruta
  res.sendStatus(204)
})

app.listen(3000, function(){
  console.log("Servidor iniciado")
})