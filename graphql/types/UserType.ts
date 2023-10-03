import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { List } from '../../graphql/schema/List'
import { checkInLocation } from '../../types/gqlOutputTypes/CheckInLocation'
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
    lists: {
      type: new GraphQLList(ListType),
      resolve: async currentUser => {
        return currentUser.listIds.map(
          async (listId: string) => await List.findOne({ id: listId })
        )
      }
    },
    groups: { type: new GraphQLList(GroupType) },
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
