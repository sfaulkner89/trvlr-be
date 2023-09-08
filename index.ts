const express = require('express')
import router from './routes/index'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import http from 'http'
import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core'
import mongoose, { RootQuerySelector } from 'mongoose'
import * as mutations from './graphql/mutations'
import { getUser, checkDuplicatePlace, userSearch } from './graphql/queries'

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    getUser,
    checkDuplicatePlace,
    userSearch
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => mutations
})

// const RootSubscriptionType = new GraphQLObjectType({
//   name: 'Subscription',
// description: 'Root Subscription',
// fields: () => {
//   return
// }
// })

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
  // subscription: RootSubscriptionType
})

const startServer = async () => {
  const app = express()
  app.use(cors())
  app.use(router)
  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    })
  )
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ]
  })
  await server.start()
  server.applyMiddleware({ app })
  const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/?retryWrites=true&w=majority`
  mongoose.connect(url)
  await new Promise(resolve => {
    const listener = httpServer.listen(
      {
        port:
          process.env.NODE_ENV === 'production'
            ? process.env.PORT || 80
            : process.env.DEV_PORT || 8080
      },
      (res: void) => resolve(res)
    )
  })
  console.log(
    `get poppin' at ${
      process.env.NODE_ENV === 'production'
        ? process.env.PORT || 80
        : process.env.DEV_PORT || 8080
    } ${server.graphqlPath}`
  )
}

startServer()
