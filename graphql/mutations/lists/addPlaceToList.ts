import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { ListType } from '../../../graphql/types/ListType'
import { List } from '../../../graphql/schema/List'
import { PlaceType } from '../../../graphql/types/PlaceType'
import { initializePlace, PlaceInitialization } from '../places/createPlace'
import { placeArgs } from './createList'

type PlaceToAdd = {
  listId: string
  place: PlaceInitialization
}

export const addPlaceToList = {
  type: ListType,
  description: 'Add a place to a list',
  args: {
    listId: { type: new GraphQLNonNull(GraphQLString) },
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
    listToAddTo.placeIds.push(newPlace.id)
    await listToAddTo.save()
    return listToAddTo
  }
}
