import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql'
import { User } from '../../schema/User'
import { UserType } from '../../types/UserType'
import { MessageGroupType } from '../../types/MessageGroupType'
import { MessageGroup } from '../../schema/Message'

export const getChats = {
  type: new GraphQLList(MessageGroupType),
  description: 'Retrieve chats',
  args: {
    ids: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: (_parents: undefined, args: { ids: string[] }) => {
    return MessageGroup.find({ id: args.ids })
  }
}
