"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { ApolloServer } from "apollo-server"
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
// routes
const user_route_1 = __importDefault(require("./routes/user.route"));
const not_found_middleware_1 = require("./middlewares/not-found.middleware");
const connectDB_1 = require("./utils/connectDB");
const type_defs_1 = require("./schema/type-defs");
const resolvers_1 = require("./schema/resolvers");
dotenv_1.default.config();
const PORT = 4000 || process.env.PORT;
// db connection
(0, connectDB_1.connectDb)();
const app = (0, express_1.default)();
const server = new server_1.ApolloServer({ typeDefs: type_defs_1.typeDefs, resolvers: resolvers_1.resolvers });
// START THE SERVER WITH EXPRESS & APOLLO SERVER
const startingServer = async () => {
    await server.start();
    app.use("/graphql", (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server));
    app.use("/api/user", user_route_1.default);
    // 404 PAGE HANDLING
    app.use(not_found_middleware_1.notFound);
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
        console.log(`graphql server running on port ${PORT}/graphql`);
    });
};
startingServer();
