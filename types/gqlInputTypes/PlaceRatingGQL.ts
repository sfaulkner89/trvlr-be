import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

export const PlaceRatingGQL: GraphQLInputObjectType =
  new GraphQLInputObjectType({
    name: 'PlaceRatingInput',
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLString) },
      userId: { type: new GraphQLNonNull(GraphQLString) },
      dateCreated: { type: new GraphQLNonNull(GraphQLString) },
      stars: { type: GraphQLFloat }
    })
  })
