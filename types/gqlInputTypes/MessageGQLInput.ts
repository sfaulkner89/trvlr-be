import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql'

export const MessageGQLInput: GraphQLInputObjectType =
  new GraphQLInputObjectType({
    name: 'MessageInput',
    fields: {
      to: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
      from: { type: new GraphQLNonNull(GraphQLString) },
      message: { type: new GraphQLNonNull(GraphQLString) },
      dateCreated: { type: new GraphQLNonNull(GraphQLString) }
    }
  })
