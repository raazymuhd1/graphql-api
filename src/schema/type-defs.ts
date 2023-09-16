import { gql } from "apollo-server-express"

export const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        image: String!
        bannerImage: String!
        followers: Int!
        resetPasswordToken: String
    }

    type Post {
        _id: ID!
        author: String!
        title: String!
        description: String!
        categories: [String!]!
        image: String!
        likes: [String]
        dislikes: [String]
        comments: [Comment]
    }

    type Comment {
        _id: ID!
        description: String!
        commentedBy: String!
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

    input UpdateUserInput {
        name: String
        email: String
        password: String
    }

    input CreatePostInput {
        author: String!
        title: String!
        description: String!
        image: String!
    }

    input UpdatePostInput {
        author: String!
        title: String!
        description: String!
        image: String!
    }

    fragment WithoutName on User {
        id
        name
        email
    }

    type Query {
        user(id: ID!): User!
        allUsers: [User]!

        allPosts: [Post]!
        post(postId: ID!): Post!
    }

    type Mutation {
        register(user: RegisterUserInput!): User
        login(user: LoginUserInput!): LoginReturnType
        updateUser(id: ID!, newData: UpdateUserInput!): User
        deleteUser(id: ID!): User 

        createPost(post: CreatePostInput!): Post
        updatePost(id: ID!, postData: UpdatePostInput): Post
        deletePost(id: ID!): Post
    }
`
