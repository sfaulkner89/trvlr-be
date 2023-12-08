import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql'
import { MessageGroup } from '../../schema/Message'
import { PubSub } from 'graphql-subscriptions'
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
    pubsub.pubsub.publish('MESSAGE_SENT', {
      newMessages: messageGroup
    })
    await User.find({ id: [from, ...to] }).updateMany({
      $push: { messagingGroups: messageGroup.id }
    })
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
