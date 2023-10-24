import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { Place } from '../../graphql/schema/Place'
import { LatLngGQL } from '../../types/gqlOutputTypes/LatLngGQL'
import { User } from '../schema/User'
import { PlaceType } from './PlaceType'
import { UserType } from './UserType'
import { CommentType } from './CommentType'
import { Comment } from '../schema/Comment'

export const ListType: GraphQLObjectType = new GraphQLObjectType({
  name: 'List',
  description: 'A list',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    photoLocation: { type: GraphQLString },
    location: { type: LatLngGQL },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    dateCreated: { type: GraphQLString },
    dateModified: { type: GraphQLString },
    placeIds: { type: new GraphQLList(GraphQLString) },
    places: {
      type: new GraphQLList(PlaceType),
      resolve: async userList =>
        userList.placeIds.map(async (placeId: string) => {
          const place = Place.findOne({ id: placeId })
          const comment = await Comment.findOne({
            _id: userList.commentIds,
            placeId,
            listId: userList.id
          })
          if (comment) return { ...place, comment: comment.content }
          return place
        })
    },
    commentIds: { type: new GraphQLList(GraphQLString) },
    followers: { type: new GraphQLList(GraphQLString) },
    followerProfiles: {
      type: new GraphQLList(UserType),
      resolve: userList => User.findOne({ id: userList.followers })
    },
    duplicatePlace: { type: GraphQLBoolean }
  })
})
