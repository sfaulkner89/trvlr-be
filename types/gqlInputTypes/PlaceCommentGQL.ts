import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

export const PlaceCommentGQL: GraphQLInputObjectType =
  new GraphQLInputObjectType({
    name: 'PlaceCommentInput',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      userId: { type: new GraphQLNonNull(GraphQLString) },
      dateCreated: { type: new GraphQLNonNull(GraphQLString) },
      likes: { type: new GraphQLNonNull(GraphQLInt) },
      text: { type: new GraphQLNonNull(GraphQLString) }
    }
  })
