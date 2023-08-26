import { gql } from "apollo-server";

const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        age: Int!
        job: String!
        address: String
        isMarried: Boolean!
        friends: [User]
        favoriteMovies: [Movie]
    }

    type Movie {
        id: ID!
        title: String!,
        genre: GENRE,
        yearRelease: String!
    }

    enum GENRE {
        HORROR,
        THRILLER,
        COMEDY,
        ACTION,
        ADVENTURE,
        FANTASY
    }

    union Data = User | Movie

    input CreateUserInput {
        name: String!
        age: Int!
        job: String!
        address: String
        isMarried: Boolean!
    }

    input UpdateUserInput {
        name: String
        age: Int
        job: String
        address: String
        isMarried: Boolean
    }


    type Query {
        user(id: ID!): User
        users: [User!]!
        movies: [Movie!]
        movie(name: String!): Movie
    }

    type Mutation {
        createUser(user: CreateUserInput!): User
        updateUser(id: ID!, user: UpdateUserInput): User
    }
`

export default typeDefs