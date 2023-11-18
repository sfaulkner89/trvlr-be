import { GraphQLList, GraphQLString, subscribe } from 'graphql'
import { MessageGroupType } from '../../graphql/types/MessageGroupType'
import { PubSub, withFilter } from 'graphql-subscriptions'
import { MessageGroupTS } from '../schema/Message'

export const newMessages = {
  type: MessageGroupType,
  description: 'New messages from the server',
  subscribe: withFilter(
    (_: undefined, __: undefined, context: { pubsub: PubSub }) => {
      console.log("Subscribing to 'MESSAGE_SENT")
      return context.pubsub.asyncIterator(['MESSAGE_SENT'])
    },
    (payload, variables) => {
      return payload.newMessages.members.includes(variables.id)
    }
  ),
  args: {
    id: { type: GraphQLString },
    date: { type: GraphQLString }
  },
  resolve: async (
    _parent: undefined,
    args: { id: string },
    _context: undefined,
    subStuff: {
      rootValue: {
        newMessages: MessageGroupTS
      }
    }
  ) => {
    return subStuff?.rootValue?.newMessages
  }
}
