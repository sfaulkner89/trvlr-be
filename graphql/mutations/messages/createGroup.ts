import { GraphQLList, GraphQLString } from 'graphql'
import { User } from '../../../graphql/schema/User'
import { MessageGroupType } from '../../types/MessageGroupType'
import { MessageGQL } from '../../../types/gqlOutputTypes/Message'
import { MessageGroup } from '../../schema/Message'
import { Message } from '../../../types/tsTypes/Message'
import { MessageGQLInput } from '../../../types/gqlInputTypes/MessageGQLInput'

type GroupInitialization = {
  name: string
  members: string[]
  group: boolean
  message: Message
}

export const createGroup = {
  type: MessageGroupType,
  description: 'Initialise a group',
  args: {
    name: { type: GraphQLString },
    members: { type: new GraphQLList(GraphQLString) },
    message: { type: MessageGQLInput }
  },
  resolve: async (_parent: undefined, args: GroupInitialization) => {
    const { name, members, message } = args
    const group = members.length > 2 || !!name
    const newGroup = await MessageGroup.create({
      name,
      members,
      group,
      messages: [message]
    })
    for (const member of members) {
      const groupUser = await User.findById(member)
      groupUser.groups.push(newGroup._id)
      groupUser.save()
    }
  }
}
