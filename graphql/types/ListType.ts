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
      resolve: userList =>
        userList.placeIds.map((placeId: string) => {
          const place = Place.findOne({ id: placeId })
          const comment = Comment.find({
            _id: userList.commentIds,
            placeId
          })
          return { ...place, comment }
        })
    },
    commentIds: { type: new GraphQLList(GraphQLString) },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: userList => Comment.find({})
    },
    followers: { type: new GraphQLList(GraphQLString) },
    followerProfiles: {
      type: new GraphQLList(UserType),
      resolve: userList => User.findOne({ id: userList.followers })
    },
    duplicatePlace: { type: GraphQLBoolean }
  })
})
