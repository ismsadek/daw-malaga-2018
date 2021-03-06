var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');
var schema = require("./schema");


var app = express();

app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(3000, () => console.log('Now browse to localhost:3000/graphql'));