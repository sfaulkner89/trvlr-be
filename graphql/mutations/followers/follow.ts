import { GraphQLNonNull, GraphQLString } from 'graphql'
import { User } from '../../schema/User'
import { UserType } from '../../types/UserType'
import { v4 } from 'uuid'

type FollowDetails = {
  userId: string
  followId: string
}

export const follow = {
  type: UserType,
  description: 'Add a new follow',
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    followId: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_parent: undefined, args: FollowDetails) => {
    const currentUser = await User.findOne({ id: args.userId })
    console.log(currentUser.followers)
    const followUser = await User.findOne({ id: args.followId })
    if (!currentUser.following.includes(args.followId)) {
      currentUser.following.push(args.followId)
      if (currentUser.followers.includes(args.followId)) {
        console.log('here')
        currentUser.contactIds.push({
          id: args.followId,
          group: 'general'
        })
      }
    }
    if (!followUser.followers.includes(args.userId)) {
      followUser.followers.push(args.userId)
      if (followUser.following.includes(args.userId)) {
        followUser.contactIds.push({
          id: args.userId,
          group: 'general'
        })
      }
    }
    currentUser.save()
    followUser.save()
    return currentUser
  }
}
