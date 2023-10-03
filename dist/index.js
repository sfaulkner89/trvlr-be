"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mutations = __importStar(require("./graphql/mutations"));
const queries_1 = require("./graphql/queries");
const newMessages_1 = require("./graphql/subscriptions/newMessages");
const getUsers_1 = require("./graphql/queries/users/getUsers");
const RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        getUser: queries_1.getUser,
        getUsers: getUsers_1.getUsers,
        checkDuplicatePlace: queries_1.checkDuplicatePlace,
        userSearch: queries_1.userSearch
    })
});
const RootMutationType = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => mutations
});
const RootSubscriptionType = new graphql_1.GraphQLObjectType({
    name: 'Subscription',
    description: 'Root Subscription',
    fields: () => ({
        newMessages: newMessages_1.newMessages
    })
});
const schema = new graphql_1.GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
    subscription: RootSubscriptionType
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
    mongoose_1.default.connect(url);
    yield new Promise(resolve => {
        const listener = httpServer.listen({
            port: process.env.NODE_ENV === 'production'
                ? process.env.PORT || 80
                : process.env.DEV_PORT || 8080
        }, (res) => resolve(res));
    });
    console.log(`get poppin' at ${process.env.NODE_ENV === 'production'
        ? process.env.PORT || 80
        : process.env.DEV_PORT || 8080} ${server.graphqlPath}`);
});
startServer();
//# sourceMappingURL=index.js.map