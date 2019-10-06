import React from 'react'
import { getBookQuery } from "./../queries/queries";
import { useQuery } from '@apollo/react-hooks';

function BookList(){
  const { loading, error, data } = useQuery(getBookQuery);
  //console.log('data', data ,loading, error);
  if(loading){
    return <div> Loading data ...</div>
  } else if(error){
    return <div> Error While Loading data ...</div>
  }
  const books = data.books.map(book=><li key={book.id}>{book.name}</li>)
  return(
    <div>
      <ul id='bookList'>
      {books}
      </ul>
    </div>
  );
}

export default BookList;