import { GraphQLNonNull, GraphQLString } from 'graphql'
import { User } from '../../schema/User'
import { UserType } from '../../types/UserType'
import { v4 } from 'uuid'
import { PubSub } from 'graphql-subscriptions'

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
  resolve: async (
    _parent: undefined,
    args: FollowDetails,
    context: { context: { pubsub: PubSub } }
  ) => {
    const currentUser = await User.findOne({ id: args.userId })
    const followUser = await User.findOne({ id: args.followId })

    console.log(
      currentUser.id,
      '(' + currentUser.username + ')',
      'unfollowed',
      followUser.id,
      '(' + followUser.username + ')'
    )
    context.context.pubsub
      .publish('FOLLOW_CHANGE', {
        followChange: {
          from: currentUser,
          to: followUser,
          follow: false
        }
      })
      .then(() => console.log('published followChange'))
      .catch(err => console.log(err))

    currentUser.following = currentUser.following.filter(
      id => id !== args.followId
    )
    currentUser.contactIds = currentUser.contactIds.filter(
      contact => contact.id !== args.followId
    ) as any
    followUser.followers = followUser.followers.filter(id => id !== args.userId)
    followUser.contactIds = followUser.contactIds.filter(
      contact => contact.id !== args.userId
    ) as any

    await currentUser.save()
    await followUser.save()
    return currentUser
  }
}
