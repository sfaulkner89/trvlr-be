import { GraphQLList, GraphQLString } from 'graphql'
import { User } from '../../../graphql/schema/User'
import { UserType } from '../../../graphql/types/UserType'

export const userSearch = {
  type: new GraphQLList(UserType),
  description: 'Search for users',
  args: {
    query: { type: GraphQLString }
  },
  resolve: async (_parent: undefined, args: { query: string }) => {
    const regex = new RegExp(args.query.toLowerCase())

    const usernameMatch = await User.find({
      $and: [{ $or: [{ username: regex }, { displayName: regex }] }]
    })

    return usernameMatch
  }
}
