import { PubSub } from 'graphql-subscriptions'
import { MessageGroup } from '../schema/Message'
import { v4 } from 'uuid'
import { User } from '../schema/User'

type NewMessage = {
  from: string
  to: string[]
  message: string
  name: string
}

export default async (
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

  messageGroup.save()
  return populatedMessageGroup[0]
}
