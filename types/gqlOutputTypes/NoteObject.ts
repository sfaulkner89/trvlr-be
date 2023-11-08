import { GraphQLObjectType, GraphQLString } from 'graphql'

export const NoteOutput: GraphQLObjectType = new GraphQLObjectType({
  name: 'NoteOutput',
  fields: {
    placeId: { type: GraphQLString },
    note: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  }
})
