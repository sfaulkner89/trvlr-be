import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType
} from 'graphql'

export const LatLngGQL: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'LatLngInput',
  fields: {
    longitude: { type: GraphQLFloat },
    latitude: { type: GraphQLFloat }
  }
})
