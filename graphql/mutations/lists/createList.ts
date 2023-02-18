import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { List } from '../../../graphql/schema/List'
import { v4 } from 'uuid'
import { ListType } from '../../../graphql/types/ListType'
import { LatLngGQL } from '../../../types/gqlInputTypes/LatLngGQL'
import { initializePlace, PlaceInitialization } from '../places/createPlace'
import { PlaceCommentGQL } from '../../../types/gqlInputTypes/PlaceCommentGQL'
import { PlaceRatingGQL } from '../../../types/gqlInputTypes/PlaceRatingGQL'
import { User } from '../../../graphql/schema/User'

type ListInitialization = {
  userId: string
  displayName: string
  location: google.maps.LatLng
  city?: string
  country?: string
  initialPlace?: PlaceInitialization
}

export const placeArgs = {
  name: { type: new GraphQLNonNull(GraphQLString) },
  googlePlaceId: { type: new GraphQLNonNull(GraphQLString) },
  location: { type: new GraphQLNonNull(LatLngGQL) },
  city: { type: GraphQLString },
  country: { type: GraphQLString },
  rating: { type: GraphQLFloat },
  comment: { type: GraphQLString },
  types: { type: new GraphQLList(GraphQLString) }
}

export const createList = {
  type: ListType,
  description: 'Initialise a list',
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: LatLngGQL },
    initialPlace: {
      type: new GraphQLInputObjectType({
        name: 'InitialPlace',
        description: 'the optional initial place on a list',
        fields: () => placeArgs
      })
    }
  },
  resolve: async (_parent: undefined, args: ListInitialization) => {
    let initializedPlace
    console.log(args.initialPlace)
    if (args.initialPlace) {
      initializedPlace = await initializePlace(_parent, args.initialPlace)
    }
    const listId = v4()
    const list = new List({
      id: listId,
      userId: args.userId,
      displayName: args.displayName,
      location: args.location,
      city: args.city,
      country: args.country,
      dateCreated: new Date().toDateString(),
      dateModified: new Date().toDateString(),
      placeIds: initializedPlace ? [initializedPlace.id] : [],
      followers: [args.userId],
      ratings: [
        {
          id: v4(),
          userId: args.userId,
          dateCreated: new Date(),
          stars: args.initialPlace ? args.initialPlace.rating : null
        }
      ],
      comments: {
        id: v4(),
        userId: args.userId,
        dateCreated: new Date().toDateString(),
        likes: 0,
        text: args.initialPlace ? args.initialPlace.comment : null
      }
    })
    const listMaker = await User.findOne({ id: args.userId })
    listMaker.listIds.push(listId)

    await listMaker.save()
    await list.save()
    return list
  }
}
