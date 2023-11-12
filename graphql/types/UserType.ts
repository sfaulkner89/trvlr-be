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
import { CountryOutput } from '../../types/gqlOutputTypes/CountryOutput'
import { MessageGroupType } from './MessageGroupType'

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
    countries: { type: new GraphQLList(CountryOutput) },
    listIds: { type: new GraphQLList(GraphQLString) },
    group: { type: GraphQLString },
    checkInLocation: { type: checkInLocation },
    admin: { type: GraphQLBoolean, defaultValue: false },
    messagingGroups: { type: new GraphQLList(MessageGroupType) },
    contactIds: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'ContactIds',
          fields: () => ({
            id: { type: GraphQLString },
            group: { type: GraphQLString }
          })
        })
      )
    },
    contacts: {
      type: new GraphQLList(UserType),
      resolve: async currentUser => {
        return await User.aggregate([
          { $match: { id: currentUser.id } },
          { $unwind: '$contactIds' },
          {
            $lookup: {
              from: 'profiles',
              localField: 'contactIds.id',
              foreignField: 'id',
              as: 'profile'
            }
          },
          {
            $unwind: '$profile'
          },
          {
            $addFields: {
              'profile.group': '$contactIds.group'
            }
          },
          {
            $replaceRoot: {
              newRoot: '$profile'
            }
          }
        ])
      }
    },
    lists: {
      type: new GraphQLList(ListType),
      resolve: async currentUser => {
        return await List.find({ id: currentUser.listIds })
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
    // messagingGroups: {
    //   type: new GraphQLList(MessageGroupType),
    //   resolve: async currentUser => {
    //     return await MessageGroup.find({ members: currentUser.messageGroupIds })
    //   }
    // }
  })
})
