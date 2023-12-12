import { PubSub } from 'graphql-subscriptions'
import { MessageGroup } from '../schema/Message'
import mongoose from 'mongoose'

type ObjectId = mongoose.Types.ObjectId

type NewMessage = {
  groupId: string
  userId: string
  message: string
}

export default async (
  _parent: undefined,
  args: NewMessage,
  { context: pubsub }: { context: { pubsub: PubSub } }
) => {
  const { userId, message, groupId } = args
  const existingMessageGroup = await MessageGroup.findOne({
    id: groupId
  })
  existingMessageGroup.messages.push({
    to: existingMessageGroup.members
      .filter((member: string) => member !== userId)
      .map((member: string) => mongoose.Types.ObjectId(member)),
    from: userId,
    message,
    dateCreated: new Date()
  })
  await pubsub.pubsub.publish('MESSAGE_SENT', {
    newMessages: existingMessageGroup
  }),
    await existingMessageGroup.save()

  console.log('existingMessageGroup PM ', existingMessageGroup)

  return existingMessageGroup
}
