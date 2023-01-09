import {
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
  rating: { type: new GraphQLList(PlaceRatingGQL) },
  comment: { type: new GraphQLList(PlaceCommentGQL) }
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
    console.log('got here')
    let initializedPlace
    if (args.initialPlace) {
      initializedPlace = await initializePlace(_parent, args.initialPlace)
    }
    const list = new List({
      id: v4(),
      userId: args.userId,
      displayName: args.displayName,
      location: args.location,
      city: args.city,
      country: args.country,
      dateCreated: new Date(),
      dateModified: new Date(),
      placeIds: initializedPlace ? [initializedPlace.id] : [],
      followers: [args.userId]
    })
    await list.save()
    return list
  }
}
