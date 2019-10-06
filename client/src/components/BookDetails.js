import React from 'react'
import { getBookQuery } from "./../queries/queries";
import { useQuery } from '@apollo/react-hooks';

function BookDetails(props){
  const { loading, error, data } = useQuery(getBookQuery, { variables: { id : props.selectedBookId }});
  if(!props.selectedBookId){
    return( <div id='book-details' >No book selected...</div> );
  } else if(loading){
    return <div id='book-details'> Loading data ...</div>
  } else if(error){
    return <div id='book-details'> Error While Loading data ...</div>
  }
  return(
    <div id='book-details'>
     <div>
        <h2>{ data.book.name }</h2>
        <p>{ data.book.genre }</p>
        <p>{ data.book.author.name }</p>
        <p>All books by this author:</p>
        <ul className="other-books">
            { data.book.author.books.map(item => {
                return <li key={item.id}>{ item.name }</li>
            })}
        </ul>
      </div>
    </div>
  );
}

export default BookDetails;