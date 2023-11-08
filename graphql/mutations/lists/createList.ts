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
import { User } from '../../../graphql/schema/User'
import { Note } from '../../schema/Note'

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
  note: { type: GraphQLString },
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
    console.log(args)
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
      dateCreated: new Date(),
      dateModified: new Date(),
      placeIds: initializedPlace ? [initializedPlace.id] : [],
      followers: [args.userId],
      ratings: [
        {
          id: v4(),
          userId: args.userId,
          dateCreated: new Date(),
          stars: args.initialPlace ? args.initialPlace.rating : null
        }
      ]
    })
    if (
      args.initialPlace?.note &&
      list.id &&
      initializedPlace?.id &&
      args.userId
    ) {
      const note = new Note({
        id: v4(),
        placeId: initializedPlace.id,
        userId: args.userId,
        listId: list.id,
        content: args.initialPlace.note,
        dateCreated: new Date(),
        dateModified: new Date()
      })
      list.noteIds.push(note.id)
      await note.save()
    }

    const listMaker = await User.findOne({ id: args.userId })
    listMaker.listIds.push(listId)

    await listMaker.save()
    await list.save()
    return list
  }
}
