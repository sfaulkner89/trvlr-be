const express = require('express')
import router from './routes/index'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import http from 'http'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import mongoose, { RootQuerySelector } from 'mongoose'
import * as mutations from './graphql/mutations'
import * as queries from './graphql/queries'
import { newMessages } from './graphql/subscriptions/newMessages'
import { PubSub } from 'graphql-subscriptions'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { expressMiddleware } from '@apollo/server/express4'

type AppContext = {
  token?: string
}

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => queries
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => mutations
})

const RootSubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  description: 'Root Subscription',
  fields: () => ({
    newMessages
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
  subscription: RootSubscriptionType
})

const startServer = async () => {
  const app = express()
  app.use(cors())
  app.use(router)

  const pubsub = new PubSub()

  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({ server: httpServer })

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx, msg, args) => {
        return {
          pubsub
        }
      },
      onConnect: () => ({ pubsub })
    },
    wsServer
  )

  const server = new ApolloServer<AppContext>({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart () {
          return {
            async drainServer () {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  await server.start()

  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    }),
    express.json(),
    expressMiddleware(server, {
      context: async () => ({ pubsub })
    })
  )

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
    } /graphql`
  )
}

startServer()
