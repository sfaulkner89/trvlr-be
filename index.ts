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
import mongoose from 'mongoose'
import { createUser, follow, unfollow } from './graphql/mutations'
import { getUser } from './graphql/queries'

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    getUser
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    createUser,
    follow,
    unfollow
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
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
  console.log(url)
  mongoose.connect(url)
  await new Promise(resolve => {
    const listener = httpServer.listen(
      { port: process.env.DEV_PORT || 2000 },
      (res: void) => resolve(res)
    )
    console.log(listener.address())
  })
  console.log(`get poppin' at ${server.graphqlPath}`)
}

startServer()
