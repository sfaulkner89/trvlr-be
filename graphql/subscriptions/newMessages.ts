import { GraphQLList, GraphQLString, subscribe } from 'graphql'
import { MessageGroupType } from '../../graphql/types/MessageGroupType'
import { PubSub } from 'graphql-subscriptions'
import { MessageGroup } from '../schema/Message'
import { User } from '../schema/User'

export const newMessages = {
  type: new GraphQLList(MessageGroupType),
  description: 'New messages from the server',
  subscribe: (_: undefined, __: undefined, context: { pubsub: PubSub }) => {
    return context.pubsub.asyncIterator(['MESSAGE_SENT'])
  },
  args: {
    ids: { type: new GraphQLList(GraphQLString) }
  },
  resolve: async (_parent: undefined, args: { ids: string[] }) => {
    console.log('IDS', args.ids)
    const newMessages = await User.findOne({ id: args.ids })
    const messageGroups = await MessageGroup.find({ id: newMessages })
    console.log('newMessages', messageGroups)
    return newMessages
  }
}
