import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql'
import { MessageGQL } from '../../../types/gqlOutputTypes/Message'
import { MessageGroup } from '../../schema/Message'
import { Message } from '../../../types/tsTypes/Message'
import { PubSub } from 'graphql-subscriptions'
import { MessageGQLInput } from '../../../types/gqlInputTypes/MessageGQLInput'
import { MessageGroupType } from '../../types/MessageGroupType'
import { User } from '../../schema/User'
import { v4 } from 'uuid'

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
  // register: (
  //   _: undefined,
  //   { messages }: MessageGroup,
  //   { pubsub }: { pubsub: PubSub }
  // ) =>
  //   pubsub.publish('MESSAGE_SENT', {
  //     messageSent: messages
  //   }),
  resolve: async (
    _parent: undefined,
    args: NewMessage,
    { context: pubsub }: { context: { pubsub: PubSub } }
  ) => {
    const { from, to, message, name } = args
    const group = to.length > 1
    const messageObject = { to, from, message, dateCreated: new Date() }

    const messageGroup = await MessageGroup.create({
      id: v4(),
      name,
      group,
      members: [...to, from],
      messages: [messageObject],
      dateCreated: new Date(),
      dateModified: new Date()
    })
    console.log('got here 1')
    pubsub.pubsub.publish('MESSAGE_SENT', {
      newMessages: messageGroup
    })
    console.log('got here 2')
    await User.find({ id: [from, ...to] }).updateMany({
      $push: { messagingGroups: messageGroup.id }
    })
    console.log('got here 3')
    const populatedMessageGroup = await MessageGroup.aggregate([
      {
        $match: { id: messageGroup.id }
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'members',
          foreignField: 'id',
          as: 'members'
        }
      }
    ])
    console.log(populatedMessageGroup[0])

    messageGroup.save()
    return populatedMessageGroup[0]
  }
}
