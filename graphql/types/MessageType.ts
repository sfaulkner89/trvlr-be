import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

export const MessageType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MessageGroup',
  description: 'A message group',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    to: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    from: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    dateCreated: { type: new GraphQLNonNull(GraphQLString) }
  })
})
