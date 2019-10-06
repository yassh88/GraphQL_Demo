
const schema = require('./schema/schema') ;
const express = require('express');
const mongoose  = require('mongoose');
const graphqlHTTP = require('express-graphql');
const cors  = require('cors');


const  app = express();
app.use(cors());

mongoose.connect('mongodb+srv://yash_1:yash_1@gqlninja-zngwo.mongodb.net/test?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() =>{ 
  console.log('Connected to db')
}).catch(err => {
  console.log('DB Connection Error: '+ err.message);
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}));

app.listen(4000, ()=>{
  console.log('Now Listening for requests on port 4000')
})