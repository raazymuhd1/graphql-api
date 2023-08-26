import { gql } from "apollo-server-express"

export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        image: String!
        resetPasswordToken: String
    }

    type Post {
        id: ID!
        title: String!
        description: String!
        image: String!
        postedBy: User!
        postedAt: String!
    }

    type Query {
        user(id: ID!): User!
        allUsers: [User]
        post(id: ID!): Post!
        allPosts: [Post]
    }

    type LoginReturnType {
        user: User
        token: String!
    }

    input RegisterUserInput {
         name: String!
         email: String!
        password: String!
    }

    input LoginUserInput {
        email: String!
        password: String!
    }

    type Mutation {
        register(user: RegisterUserInput!): User
        login(user: LoginUserInput!): LoginReturnType
    }
`
