import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql'
import { MessageGQL } from '../../../types/gqlOutputTypes/Message'
import { MessageGroup } from '../../schema/Message'
import { Message } from '../../../types/tsTypes/Message'
import { PubSub } from 'graphql-subscriptions'
import { MessageGQLInput } from '../../../types/gqlInputTypes/MessageGQLInput'
import { MessageGroupType } from '../../types/MessageGroupType'

type NewMessage = {
  from: string
  to: string[]
  message: string
  name: string
}

export const createGroup = {
  type: MessageGroupType,
  description: 'Start a group with a message',
  args: {
    from: { type: new GraphQLNonNull(GraphQLString) },
    to: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    message: { type: GraphQLString },
    name: { type: GraphQLString }
  },
  register: (
    _: undefined,
    { messages }: MessageGroup,
    { pubsub }: { pubsub: PubSub }
  ) =>
    pubsub.publish('MESSAGE_SENT', {
      messageSent: messages
    }),
  resolve: async (_parent: undefined, args: NewMessage) => {
    const { from, to, message, name } = args
    const group = to.length > 1
    const messageObject = { to, from, message, dateCreated: new Date() }
    const messageGroup = await MessageGroup.create({
      name,
      group,
      members: [...to, from],
      messages: [messageObject]
    })
    messageGroup.save()
    return messageGroup
  }
}
