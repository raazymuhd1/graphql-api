// import { ApolloServer } from "apollo-server"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServer } from "apollo-server-express"

import { connectDb } from "./utils/connectDB.js"
import { typeDefs } from "./schema/type-defs.js"
import { resolvers } from "./schema/resolvers.js" 

dotenv.config()
const PORT = 8000 || process.env.PORT
const app = express()

// db connection
connectDb()

const server = new ApolloServer({ typeDefs, resolvers });
await server.start()
server.applyMiddleware({ app })

app.use("/graphql", 
    cors(), 
    express.json(), 
    expressMiddleware(server), () => console.log("server is running")
)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))