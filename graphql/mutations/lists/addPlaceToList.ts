import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { ListType } from '../../../graphql/types/ListType'
import { List } from '../../../graphql/schema/List'
import { PlaceType } from '../../../graphql/types/PlaceType'
import { initializePlace, PlaceInitialization } from '../places/createPlace'
import { placeArgs } from './createList'
import { v4 } from 'uuid'
import { Note } from '../../schema/Note'

type PlaceToAdd = {
  listId: string
  userId: string
  place: PlaceInitialization
}

export const addPlaceToList = {
  type: ListType,
  description: 'Add a place to a list',
  args: {
    listId: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    place: {
      type: new GraphQLInputObjectType({
        name: 'PlaceToAdd',
        description: 'the place to add to a list',
        fields: () => placeArgs
      })
    }
  },
  resolve: async (_parent: undefined, args: PlaceToAdd) => {
    const newPlace = await initializePlace(_parent, args.place)
    const listToAddTo = await List.findOne({ id: args.listId })
    if (args.place.note) {
      console.log('note found')
      try {
        const note = new Note({
          id: v4(),
          userId: args.userId,
          placeId: newPlace.id,
          listId: args.listId,
          content: args.place.note,
          dateCreated: new Date(),
          dateModified: new Date()
        })
        await note.save()
      } catch (e) {
        console.log(e)
      }
    }
    listToAddTo.placeIds.push(newPlace.id)
    await listToAddTo.save()
    return listToAddTo
  }
}
