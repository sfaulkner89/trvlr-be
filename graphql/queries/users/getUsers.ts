import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql'
import { User } from '../../schema/User'
import { UserType } from '../../types/UserType'

export const getUsers = {
  type: new GraphQLList(UserType),
  description: 'Retrieve users',
  args: {
    ids: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
  },
  resolve: async (_parents: undefined, args: { ids: string[] }) => {
    return await User.find({ id: args.ids })
  }
}
