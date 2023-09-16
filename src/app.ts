// import { ApolloServer } from "apollo-server"
import express from "express"
import cors, { CorsRequest } from "cors"
import dotenv from "dotenv"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
// routes
import userRoutes from "./routes/user.route"
import { notFound } from "./middlewares/not-found.middleware"
import { connectDb } from "./utils/connectDB"
import { typeDefs } from "./schema/type-defs"
import { resolvers } from "./schema/resolvers" 

dotenv.config()
const PORT = 4000 || process.env.PORT

// db connection
connectDb()

const app = express()
const server = new ApolloServer({ typeDefs, resolvers });

// START THE SERVER WITH EXPRESS & APOLLO SERVER
const startingServer = async() => {
    await server.start()
    app.use("/graphql", cors<CorsRequest>(), express.json(), expressMiddleware(server))
    app.use("/api/user", userRoutes)
    // 404 PAGE HANDLING
    app.use(notFound)

    app.listen(PORT, () => {
         console.log(`server running on port ${PORT}`)
         console.log(`graphql server running on port ${PORT}/graphql`)
    })
}
startingServer()
