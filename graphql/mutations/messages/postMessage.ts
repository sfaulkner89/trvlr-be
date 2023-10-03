import { GraphQLString } from 'graphql'
import { MessageGQL } from '../../../types/gqlOutputTypes/Message'
import { MessageGroup } from '../../schema/Message'
import { Message } from '../../../types/tsTypes/Message'
import { PubSub } from 'graphql-subscriptions'
import { MessageGQLInput } from '../../../types/gqlInputTypes/MessageGQLInput'
import { MessageGroupType } from '../../types/MessageGroupType'

type NewMessage = {
  id: string
  message: Message
}

const pubsub = new PubSub()

export const postMessage = {
  type: MessageGroupType,
  description: 'Add a message to a group',
  args: {
    id: { type: GraphQLString },
    message: { type: MessageGQLInput }
  },
  resolve: async (_parent: undefined, args: NewMessage) => {
    const { id, message } = args
    const messageGroup = await MessageGroup.findById(id)
    messageGroup.messages.push(message)
    messageGroup.save()
    pubsub.publish('NEW_MESSAGE', message)
  }
}
