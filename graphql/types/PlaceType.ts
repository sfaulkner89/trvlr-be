import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { PlaceRatingGQL } from '../../types/gqlOutputTypes/PlaceRatingGQL'
import { LatLngGQL } from '../../types/gqlOutputTypes/LatLngGQL'
import { PlaceCommentGQL } from '../../types/gqlOutputTypes/PlaceCommentGQL'

export const PlaceType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Place',
  description: 'A place',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    googlePlaceId: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLNonNull(LatLngGQL) },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    dateCreated: { type: new GraphQLNonNull(GraphQLString) },
    dateModified: { type: new GraphQLNonNull(GraphQLString) },
    ratings: { type: new GraphQLList(PlaceRatingGQL) },
    comments: { type: new GraphQLList(PlaceCommentGQL) },
    types: { type: new GraphQLList(GraphQLString) }
  })
})
