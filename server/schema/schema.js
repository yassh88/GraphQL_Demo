const graphql = require('graphql');
const _ = require('lodash')

const Book = require('../models/book');
const Author = require('../models/author');


const {GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} =graphql;

//dummy
// var books = [
//   {id: '1', name: 'BOOK1' , genre: 'genre1', authorId: '1'},
//   {id: '2', name: 'BOOK2' , genre: 'genre3', authorId: '2'},
//   {id: '3', name: 'BOOK3' , genre: 'genre3', authorId: '1'},
//   {id: '4', name: 'BOOK4' , genre: 'genre4', authorId: '2'},
//   {id: '5', name: 'BOOK5' , genre: 'genre5', authorId: '1'},
// ];

// var authors = [
//   {id: '1', name: 'Authors1' , age: 11},
//   {id: '2', name: 'Authors2' , age: 13},
//   {id: '3', name: 'Authors3' , age: 13},
// ];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields:()=>({
    id: {type : GraphQLID},
    name: {type : GraphQLString},
    genre: {type : GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent,args){
        // return authors.find(author=>author.id===parent.authorId)
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields:()=>({
    id: {type : GraphQLID},
    name: {type : GraphQLString},
    age: {type : GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent,args){
        // return books.filter(book=>book.authorId===parent.id)
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    book: {
      type : BookType,
      args: {id: {type : GraphQLID}},
      resolve(parent,args){
        // return books.find(book=>book.id===args.id)
      }
    },
    author: {
      type : AuthorType,
      args: {id: {type : GraphQLID}},
      resolve(parent,args){
        // return authors.find(author=>author.id===args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent,args){
        // return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent,args){
        // return authors
      }
    },
  }
});


const Mutation = new GraphQLObjectType({
   name: 'Mutation',
   fields:{
     addAuthor:{
       type: AuthorType,
       args: {
         name: {type: GraphQLString},
         age: {type: GraphQLInt},
       },
       resolve(parent, args){
         console.log('parent',args.name)
         let author = new Author({
          name: args.name,
          age: args.age,
         });
         return author.save();
       }
     }
   }

})
module.exports = new GraphQLSchema({
  query:RootQuery,
  mutation: Mutation,
});