const graphql = require('graphql');
const _ = require('lodash')


const {GraphQLObjectType, GraphQLString, GraphQLSchema} =graphql;

//dummy
var books = [
  {id: '1', name: 'BOOK1' , genre: 'genre1'},
  {id: '2', name: 'BOOK2' , genre: 'genre3'},
  {id: '3', name: 'BOOK3' , genre: 'genre3'},
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields:()=>({
    id: {type : GraphQLString},
    name: {type : GraphQLString},
    genre: {type : GraphQLString},
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    book: {
      type : BookType,
      args: {id: {type : GraphQLString}},
      resolve(parent,args){
        console.log('books',books);
        return _.find(books,{id: args.id})
      }
    }
  }
});


// book(id: "2"){
//   name,
//   genre
// };

module.exports = new GraphQLSchema({
  query:RootQuery
});