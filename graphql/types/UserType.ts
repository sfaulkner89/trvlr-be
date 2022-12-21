import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { User } from '../schema/User'
import { GroupType } from './GroupType'

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
    lists: { type: new GraphQLList(GraphQLString) },
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
