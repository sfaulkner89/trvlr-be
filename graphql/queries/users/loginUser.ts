import { GraphQLNonNull, GraphQLString } from 'graphql'
import { User } from '../../schema/User'
import { UserType } from '../../types/UserType'

export const loginUser = {
  type: UserType,
  description: 'Retrieve a user with email and password',
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (
    _parents: undefined,
    args: { email: string; password: string }
  ) => {
    const user = await User.findOne({
      email: args.email,
      password: args.password
    })
    return user
  }
}
