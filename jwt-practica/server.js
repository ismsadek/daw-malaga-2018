// var jwt = require('jsonwebtoken');
// var payload = {		// la info que s emete dentro del toke es el 'payload'
// 	admin: true,
// 	name: 'Peter Pan'
// };

// //firmo el payload con la clave campanilla
// var token = jwt.sign(payload, 'campanilla', {
// 	expiresIn: '2 days'
// }); 

// // console.log(token)

// // verifico el token con la contraseña
// jwt.verify(token,'campanilla', function(err, decoded){
// 	if(err) {
// 		console.log('Token incorrecto');
// 	} else {
// 		console.log('Token correcto', decoded)
// 	}
// })

var jwt = require('jsonwebtoken');
var payload = { 
	admin: true,
	name: 'Peter Pan'
};
var token = jwt.sign(payload, 'campanilla', {
	expiresIn: '10 seconds'
});



function comprobate(){
	jwt.verify(token,'campanilla', function(err, decoded){
	if(err) {
		console.log('Token incorrecto');
	} else {
		console.log('Token correcto', decoded)
	}
})
}

setInterval(comprobate, 1000)
