import { GraphQLNonNull, GraphQLString } from 'graphql'
import { User } from '../../schema/User'
import { UserType } from '../../types/UserType'
import { v4 } from 'uuid'

type FollowDetails = {
  userId: string
  followId: string
}

export const unfollow = {
  type: UserType,
  description: 'Remove follow',
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    followId: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_parent: undefined, args: FollowDetails) => {
    const currentUser = await User.findOne({ id: args.userId })
    const followUser = await User.findOne({ id: args.followId })

    currentUser.following.filter(id => id !== args.followId)
    followUser.followers.filter(id => id !== args.userId)

    currentUser.save()
    followUser.save()
    return currentUser
  }
}
