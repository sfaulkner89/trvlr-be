import { GraphQLNonNull, GraphQLString } from 'graphql'
import { User } from '../../schema/User'
import { UserType } from '../../types/UserType'

export const loginUser = {
  type: UserType,
  description: 'Retrieve a user with email and password',
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (
    _parents: undefined,
    args: { email: string; password: string }
  ) => {
    console.log(args)
    const user = await User.aggregate([
      {
        $match: { email: args.email, password: args.password }
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
        $unwind: { path: '$messagingGroups', preserveNullAndEmptyArrays: true }
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
    if (user[0]?.messagingGroups[0]?.members?.length === 0)
      user[0].messagingGroups = []
    return user[0]
  }
}
