import React, {useState} from 'react'
import { getBooksQuery } from "./../queries/queries";
import { useQuery } from '@apollo/react-hooks';
import BookDetails from './BookDetails';

function BookList(){
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selectedBookId, updateBookId] = useState(null)
  if(loading){
    return <div> Loading data ...</div>
  } else if(error){
    return <div> Error While Loading data ...</div>
  }
  const books = data.books.map(book=><li onClick={()=>updateBookId(book.id)}key={book.id}>{book.name}</li>)
  return(
    <div>
      <ul id="book-list">
      {books}
      </ul>
      <BookDetails selectedBookId={selectedBookId}/>
    </div>
  );
}

export default BookList;