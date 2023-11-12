import { GraphQLList, GraphQLString } from 'graphql'
import { MessageGQL } from '../../../types/gqlOutputTypes/Message'
import { MessageGroup } from '../../schema/Message'
import { Message } from '../../../types/tsTypes/Message'
import { PubSub } from 'graphql-subscriptions'
import { MessageGQLInput } from '../../../types/gqlInputTypes/MessageGQLInput'
import { MessageGroupType } from '../../types/MessageGroupType'
import { MessageType } from '../../types/MessageType'

type NewMessage = {
  groupId: string
  userId: string
  message: string
}

export const postMessage = {
  type: MessageGroupType,
  description: 'Add a message to a group',
  args: {
    groupId: { type: GraphQLString },
    userId: { type: GraphQLString },
    message: { type: GraphQLString }
  },
  resolve: async (
    _parent: undefined,
    args: NewMessage,
    { context: pubsub }: { context: { pubsub: PubSub } }
  ) => {
    console.log('args', args)
    const { userId, message, groupId } = args
    const existingMessageGroup = await MessageGroup.findOne({ id: groupId })
    existingMessageGroup.dateModified = new Date()
    existingMessageGroup.messages.push({
      to: existingMessageGroup.members.filter(
        (member: string) => member !== userId
      ),
      from: userId,
      message,
      dateCreated: new Date()
    })
    pubsub.pubsub.publish('MESSAGE_SENT', {
      messageSent: existingMessageGroup
    }),
      existingMessageGroup.save()

    console.log('existingMessageGroup', existingMessageGroup)

    return existingMessageGroup
  }
}
