"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const http_1 = __importDefault(require("http"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const mongoose_1 = __importDefault(require("mongoose"));
const mutations_1 = require("./graphql/mutations");
const queries_1 = require("./graphql/queries");
const RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        getUser: queries_1.getUser
    })
});
const RootMutationType = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        createUser: mutations_1.createUser,
        follow: mutations_1.follow,
        unfollow: mutations_1.unfollow
    })
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express();
    app.use((0, cors_1.default)());
    app.use(index_1.default);
    app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
        schema,
        graphiql: true
    }));
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true })
        ]
    });
    yield server.start();
    server.applyMiddleware({ app });
    const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/?retryWrites=true&w=majority`;
    console.log(url);
    mongoose_1.default.connect(url);
    yield new Promise(resolve => {
        const listener = httpServer.listen({ port: process.env.DEV_PORT || 2000 }, (res) => resolve(res));
        console.log(listener.address());
    });
    console.log(`get poppin' at ${server.graphqlPath}`);
});
startServer();
//# sourceMappingURL=index.js.map