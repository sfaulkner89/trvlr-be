import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType
} from 'graphql'

export const LatLngGQL: GraphQLObjectType = new GraphQLObjectType({
  name: 'LatLngOutput',
  fields: {
    longitude: { type: GraphQLFloat },
    latitude: { type: GraphQLFloat }
  }
})
