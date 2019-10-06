import React, {useState}  from 'react'
import { getAuthorsQuery, addBookMutation,  getBookQuery } from "./../queries/queries";
import { useQuery, useMutation } from '@apollo/react-hooks';


function AddBook(){
  const { loading, error, data } = useQuery(getAuthorsQuery); 
  const [saveBookMutation, { loading: mutationLoading, error: mutationError, data: mutationData  }] = useMutation(addBookMutation); 
  const [bookState, updateBook ] = useState({
    name: '',
    genre: '',
    authorId: ''
  })

  if(loading ){
    return <option> Loading data ...</option>
  } else if(error){
    return <option> Error While Loading data ...</option>
  }



  function updateBookState(value, type){
    const tmpObj = Object.assign({}, bookState);
    tmpObj[type]=value;
    updateBook(tmpObj);
  }
  //console.log('data', data ,loading, error);
  console.log('dataMutation', mutationLoading ,mutationError, mutationData);
  
  function submitForm(e){
    e.preventDefault()
    console.log('data',bookState);
    saveBookMutation({
            variables: {
              name: bookState.name,
              genre: bookState.genre,
              authorId: bookState.authorId
          },
          refetchQueries: [{ query: getBookQuery }]
    });
  }

  const authors = data.authors.map(author=><option key={author.id}  value={author.id} >{author.name}</option>)
  if(mutationLoading ){
    return <div> Please wait saving data...</div>
  } else if(mutationError){
    return <div> Error While saving data ...</div>
  }
  return(
    <form id="add-book" onSubmit={(e) => submitForm(e) }>
        <div className="field">
            <label>Book name:</label>
            <input type="text" onChange={ (e) => updateBookState(e.target.value, 'name') } />
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={ (e) => updateBookState(e.target.value, 'genre') } />
        </div>
        <div className="field">
            <label>Author:</label>
            <select onChange={ (e) => updateBookState(e.target.value, 'authorId') }>
                <option>Select author</option>
                { authors }
            </select>
        </div>
        <button>+</button>
    </form>
  );
}

export default AddBook;