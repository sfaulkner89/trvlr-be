import { GraphQLNonNull, GraphQLString } from 'graphql'
import { List } from '../../schema/List'
import { ListType } from '../../types/ListType'

export const getList = {
  type: ListType,
  description: 'Retrieve a list',
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (_parents: undefined, args: { id: string }) => {
    return List.findOne({ id: args.id })
  }
}
