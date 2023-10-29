import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { List } from '../../graphql/schema/List'
import { checkInLocation } from '../../types/gqlOutputTypes/CheckInLocation'
import { MessageGroup } from '../schema/Message'
import { User } from '../schema/User'
import { GroupType } from './GroupType'
import { ListType } from './ListType'

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  description: "A single user's data",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    dob: { type: new GraphQLNonNull(GraphQLString) },
    profileLocation: { type: GraphQLString },
    followers: { type: new GraphQLList(GraphQLString) },
    following: { type: new GraphQLList(GraphQLString) },
    countries: { type: new GraphQLList(GraphQLString) },
    listIds: { type: new GraphQLList(GraphQLString) },
    checkInLocation: { type: checkInLocation },
    admin: { type: GraphQLBoolean, defaultValue: false },
    lists: {
      type: new GraphQLList(ListType),
      resolve: async currentUser => {
        return currentUser.listIds.map(
          async (listId: string) => await List.findOne({ id: listId })
        )
      }
    },
    groupIds: { type: new GraphQLList(GroupType) },
    groups: {
      type: new GraphQLList(GroupType),
      resolve: async currentUser => {
        currentUser.groupIds.map(async (groupId: string) => {
          const group = await MessageGroup.findOne({ id: groupId })
          const groupMembers = group.members.map(async memberId => {
            return await User.findOne({ id: memberId })
          })
          return {
            ...group,
            members: groupMembers
          }
        })
      }
    },
    followerUsers: {
      type: new GraphQLList(UserType),
      resolve: async currentUser => {
        return currentUser.followers.map(
          async (followerId: string) => await User.findOne({ id: followerId })
        )
      }
    },
    followingUsers: {
      type: new GraphQLList(UserType),
      resolve: async currentUser => {
        return currentUser.following.map(
          async (followingId: string) => await User.findOne({ id: followingId })
        )
      }
    }
  })
})
