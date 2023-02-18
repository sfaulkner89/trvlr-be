import { GraphQLNonNull, GraphQLString } from 'graphql'
import { User } from '../../graphql/schema/User'
import { UserType } from '../../graphql/types/UserType'

export const getUser = {
  type: UserType,
  description: 'Retrieve a user',
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (_parents: undefined, args: { id: string }) => {
    console.log('here')
    return User.findOne({ id: args.id })
  }
}
