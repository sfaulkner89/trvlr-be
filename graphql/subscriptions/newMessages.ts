import { GraphQLList, GraphQLString, subscribe } from 'graphql'
import { MessageGroupType } from '../../graphql/types/MessageGroupType'
import { PubSub } from 'graphql-subscriptions'
import { MessageGroup } from '../schema/Message'

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
    const newMessages = await MessageGroup.find({ id: { $in: args.ids } })
    return newMessages
  }
}
