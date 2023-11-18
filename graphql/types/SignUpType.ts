import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'

export const SignUpType: GraphQLObjectType = new GraphQLObjectType({
  name: 'SignUp',
  description: 'A signup',
  fields: () => {
    return {
      _id: { type: GraphQLString },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      username: { type: GraphQLString },
      countriesVisited: { type: new GraphQLList(GraphQLString) },
      countriesToVisit: { type: new GraphQLList(GraphQLString) }
    }
  }
})
