const { makeExecutableSchema } = require("graphql-tools");
const faker = require('faker');
const typeDefs = `
type Query {
    post(id: String!): Post
    posts: [Post]
},
type Mutation {
  postAdd(title: String!, description: String): Post
}
type Post {
    id: String!
    title: String!
    description: String
}
`;



var postsData = [];

for (var i=0;i<10;i++){
  var item = {
    id: faker.random.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph() 
  }
  postsData.push(item)
}

function getPost(arg){
  var id = arg.id
  return postsData.filter(item => {return item.id == id })[0] || null;
}

 function getPosts(){
  return postsData;
}

function postAdd({title, description}) {
  var id = faker.random.uuid();
  postsData.push({
    id:id,
    title: title,
    description: description
  })
  
  return postsData.filter(item => item.id === id) [0];
}


const resolvers = {
  Query: {
    posts: () => getPosts(),
    post: (rootValue, args) => getPost(args)
  }
}

const schema = makeExecutableSchema( { typeDefs, resolvers } )

module.exports = schema