import { GraphQLList, GraphQLString, subscribe } from 'graphql'
import { MessageGroupType } from '../../graphql/types/MessageGroupType'
import { PubSub } from 'graphql-subscriptions'
import { MessageGroup } from '../schema/Message'

const pubsub = new PubSub()

export const newMessages = {
  type: new GraphQLList(MessageGroupType),
  description: 'New messages from the server',
  subscribe: () => pubsub.asyncIterator(['MESSAGE_SENT']),
  args: {
    ids: { type: new GraphQLList(GraphQLString) }
  },
  resolve: async (_parent: undefined, args: { ids: string[] }) => {
    const newMessages = await MessageGroup.find({ id: { $in: args.ids } })
    return newMessages
  }
}
