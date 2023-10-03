import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from 'graphql'

export const MessageGQL: GraphQLObjectType = new GraphQLObjectType({
  name: 'Message',
  fields: {
    to: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    from: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    dateCreated: { type: new GraphQLNonNull(GraphQLString) }
  }
})
