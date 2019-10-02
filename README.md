# GraphQL_Demo
GraphQL learning 

Connect you mango db form below url in server/app.js:
https://cloud.mongodb.com/

in Collection you will find all mutations data


You can start server node project by move in server folder and hit below command 

node app     // using node
nodemon app  // auto restart and require nodemon package on your system



//add book
mutation{
  addBook(name:"book", genre: "genre", authorId: "5d9440fad51de31ee5f568d0"){
    name
    genre
    authorId
  }
}

//add auther
mutation{
  addAuthor(name:"auther3", age: 39){
    name
    age
  }
}

//book by id
{
  book(id: "5d94534149c3122a2fa24c7a"){
    name
    genre
    authorId
    id
    author{
      name,
      age
    }
  }
}

//books
{
  books{
    name
    genre
    authorId
    id
    author{
      name,
      age
    }
  }
}

//author
{
  authors{
    name,
    age
    books{
      name
      genre
      authorId
      id
    }
  }
}

// auther by id
{
  author(id: "5d9440fad51de31ee5f568d0"){
    name,
    age
    books{
      name
      genre
      authorId
      id
    }
  }
}