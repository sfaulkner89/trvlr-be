import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { List } from '../../../graphql/schema/List'
import { User } from '../../../graphql/schema/User'
import { UserType } from '../../types/UserType'

export const deleteList = {
  type: UserType,
  description: 'Removes a list from a user',
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    listId: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (
    _parent: undefined,
    args: { listId: string; userId: string }
  ) => {
    const list = await List.findOne({ id: args.listId })
    const user = await User.findOne({ id: args.userId })

    user.listIds = user.listIds.filter(listId => listId !== args.listId)
    list.deleted = true
    await list.save()
    await user.save()
    return user
  }
}
