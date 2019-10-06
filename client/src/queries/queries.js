
import { gql } from "apollo-boost";


export const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

export const getBookQuery = gql`
{
  books{
    name
    genre
    id
  }
}
`

export const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;