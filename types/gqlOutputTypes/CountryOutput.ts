import { GraphQLObjectType } from 'graphql'
import { GraphQLOutputType, GraphQLString } from 'graphql'

export const CountryOutput: GraphQLOutputType = new GraphQLObjectType({
  name: 'CountryOutput',
  fields: {
    country: { type: GraphQLString },
    dateAdded: { type: GraphQLString }
  }
})
