import { GraphQLBoolean, GraphQLList, GraphQLString, subscribe } from 'graphql'
import { PubSub, withFilter } from 'graphql-subscriptions'
import { MessageGroupTS } from '../schema/Message'

import { FollowChange } from '../../types/gqlOutputTypes/followChange'

export const followChange = {
  type: FollowChange,
  description: 'A Change to followers/following',
  subscribe: withFilter(
    (_: undefined, variables: { id: string }, context: { pubsub: PubSub }) => {
      console.log(variables.id, "Subscribing to 'FOLLOW_CHANGE'")
      return context.pubsub.asyncIterator(['FOLLOW_CHANGE'])
    },
    (payload, variables) => {
      return payload.followChange.to.id === variables.id
      // return true
    }
  ),
  args: {
    id: { type: GraphQLString }
  },
  resolve: async (
    _parent: undefined,
    args: { id: string },
    _context: undefined,
    subStuff: {
      rootValue: {
        followChange: any
      }
    }
  ) => {
    return subStuff?.rootValue?.followChange
  }
}
