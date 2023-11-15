import { GraphQLNonNull, GraphQLString } from 'graphql'
import { User } from '../../schema/User'
import { UserType } from '../../types/UserType'
import { v4 } from 'uuid'
import { PubSub } from 'graphql-subscriptions'

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
      'followed',
      followUser.id,
      '(' + followUser.username + ')'
    )

    if (!currentUser.following.includes(args.followId)) {
      //if currentUser doesnt follow followUser
      currentUser.following.push(args.followId)
    }
    if (!followUser.followers.includes(args.userId)) {
      //if currentUser doesnt follow followUser
      followUser.followers.push(args.userId) //add the currentUser to the followUser's followers
    }

    if (
      followUser.following.includes(args.userId) &&
      currentUser.following.includes(args.followId)
    ) {
      console.log(
        currentUser.id,
        '(' + currentUser.username + ')',
        'and',
        followUser.id,
        '(' + followUser.username + ')' + ' are now contacts'
      )

      context.context.pubsub.publish('FOLLOW_CHANGE', {
        followChange: {
          from: currentUser,
          to: followUser,
          follow: true
        }
      })
      //if the followUser is already following the currentUser
      if (!followUser.contactIds.map(x => x?.id).includes(args.userId)) {
        // don't add it again bascically
        followUser.contactIds.push({
          //make a new contactId for the currentUser
          id: args.userId,
          group: 'general'
        })
      }

      if (!currentUser.contactIds.map(x => x?.id).includes(args.followId)) {
        currentUser.contactIds.push({
          //make a new contactId for the currentUser
          id: args.followId,
          group: 'general'
        })
      }
    }

    currentUser.save()
    followUser.save()
    return currentUser
  }
}
