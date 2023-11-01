import { GraphQLBoolean, GraphQLInputObjectType, GraphQLString } from 'graphql'

export const CountryInput: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'CountryInput',
  fields: {
    country: { type: GraphQLString },
    visited: { type: GraphQLBoolean }
  }
})
