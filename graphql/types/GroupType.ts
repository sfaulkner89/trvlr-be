import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { UserType } from './UserType'

export const GroupType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Group',
  description: 'A group of contacts',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    groupName: { type: GraphQLString },
    members: { type: new GraphQLList(GraphQLString) },
    memberProfiles: {
      type: new GraphQLList(UserType),
      resolve: Group => {
        Group.members.map((memberId: string) => Group.findOne({ id: memberId }))
      }
    }
  })
})
