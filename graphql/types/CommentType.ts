import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

export const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'A comment',
  fields: () => ({
    id: { type: GraphQLID },
    placeId: { type: GraphQLID },
    userId: { type: GraphQLID },
    listId: { type: GraphQLID },
    content: { type: GraphQLString },
    dateCreated: { type: GraphQLString },
    dateModified: { type: GraphQLString }
  })
})
