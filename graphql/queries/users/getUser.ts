import { GraphQLNonNull, GraphQLString } from 'graphql'
import { User } from '../../schema/User'
import { UserType } from '../../types/UserType'

export const getUser = {
  type: UserType,
  description: 'Retrieve a user',
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (_parents: undefined, args: { id: string }) => {
    return User.findOne({ id: args.id })
  }
}
