import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

export const PlaceRatingGQL: GraphQLObjectType = new GraphQLObjectType({
  name: 'PlaceRatingOutput',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    dateCreated: { type: new GraphQLNonNull(GraphQLString) },
    stars: { type: new GraphQLNonNull(GraphQLString) }
  })
})
