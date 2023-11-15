import { GraphQLBoolean, GraphQLObjectType } from 'graphql'
import { GraphQLOutputType, GraphQLString } from 'graphql'
import { UserType } from '../../graphql/types/UserType'

export const FollowChange: GraphQLOutputType = new GraphQLObjectType({
  name: 'FollowChange',
  fields: {
    from: { type: UserType },
    to: { type: UserType },
    follow: { type: GraphQLBoolean }
  }
})
