
const schema = require('./schema/schema') ;
const express = require('express');
const graphqlHTTP = require('express-graphql');


const  app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}));
app.listen(4000, ()=>{
  console.log('Now Listening for requests on port 4000')
})