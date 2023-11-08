import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

export const NoteType = new GraphQLObjectType({
  name: 'Note',
  description: 'A note',
  fields: () => ({
    id: { type: GraphQLString },
    placeId: { type: GraphQLString },
    userId: { type: GraphQLString },
    listId: { type: GraphQLString },
    content: { type: GraphQLString },
    dateCreated: { type: GraphQLString },
    dateModified: { type: GraphQLString }
  })
})
