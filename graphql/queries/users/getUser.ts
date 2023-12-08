import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from 'graphql'
import { AppContext } from '../../..'
import { User } from '../../schema/User'
import { UserType } from '../../types/UserType'

export const getUser = {
  type: UserType,
  description: 'Retrieve a user',
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    populated: { type: GraphQLBoolean, defaultValue: false }
  },
  resolve: async (
    _parents: undefined,
    args: { id: string; populated: boolean },
    context: AppContext
  ) => {
    if (args.populated) {
      const populatedUser = await User.aggregate([
        {
          $match: { id: args.id }
        },
        {
          $lookup: {
            from: 'messages',
            localField: 'messagingGroups',
            foreignField: 'id',
            as: 'messagingGroups'
          }
        },
        {
          $unwind: {
            path: '$messagingGroups',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'messagingGroups.members',
            foreignField: 'id',
            as: 'messagingGroups.members'
          }
        },
        {
          $group: {
            _id: '$_id',
            messagingGroups: { $push: '$messagingGroups' },
            id: { $first: '$id' },
            email: { $first: '$email' },
            password: { $first: '$password' },
            username: { $first: '$username' },
            displayName: { $first: '$displayName' },
            dob: { $first: '$dob' },
            profileLocation: { $first: '$profileLocation' },
            followers: { $first: '$followers' },
            following: { $first: '$following' },
            countries: { $first: '$countries' },
            listIds: { $first: '$listIds' },
            group: { $first: '$group' },
            checkInLocation: { $first: '$checkInLocation' },
            admin: { $first: '$admin' },
            contactIds: { $first: '$contactIds' }
          }
        }
      ])

      if (populatedUser[0]?.messagingGroups[0]?.members?.length === 0)
        populatedUser[0].messagingGroups = []

      return populatedUser[0]
    } else {
      return await User.findOne({ id: args.id })
    }
  }
}
