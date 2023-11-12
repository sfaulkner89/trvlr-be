import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { MessageType } from './MessageType'
import { MessageGQL } from '../../types/gqlOutputTypes/Message'
import { UserType } from './UserType'

export const MessageGroupType: GraphQLObjectType = new GraphQLObjectType({
  name: 'MessageGroup',
  description: 'A message group',
  fields: () => {
    return {
      id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString },
      members: { type: new GraphQLList(UserType) },
      group: { type: GraphQLBoolean },
      messages: { type: new GraphQLList(MessageGQL) },
      dateCreated: { type: GraphQLString },
      dateModified: { type: GraphQLString }
    }
  }
})
