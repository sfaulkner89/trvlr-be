import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { User } from '../schema/User'
import { UserType } from './UserType'

const LatLng: GraphQLObjectType = new GraphQLObjectType({
  name: 'LatLng',
  fields: () => ({
    longitude: { type: GraphQLInt },
    latitude: { type: GraphQLInt }
  })
})

export const ListType: GraphQLObjectType = new GraphQLObjectType({
  name: 'List',
  description: 'A list',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    photoLocation: { type: GraphQLString },
    location: { type: LatLng },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    dateCreated: { type: GraphQLString },
    dateModified: { type: GraphQLString },
    placeIds: { type: new GraphQLList(GraphQLString) },
    followers: { type: new GraphQLList(GraphQLString) },
    followerProfiles: {
      type: new GraphQLList(UserType),
      resolve: userList =>
        userList.followers.map((follower: string) => {
          return User.findOne({ id: follower })
        })
    }
  })
})
