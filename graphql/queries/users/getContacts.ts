import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql'
import { User } from '../../schema/User'
import { UserType } from '../../types/UserType'

export const getContacts = {
  type: UserType,
  description: 'Retrieve users',
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_parents: undefined, args: { userId: string }) => {
    const user = await User.findOne({ id: args.userId })
    return user
  }
}
