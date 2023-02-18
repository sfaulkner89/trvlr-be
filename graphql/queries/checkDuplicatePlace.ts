import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from 'graphql'
import {
  argsToArgsConfig,
  GraphQLInputObjectType
} from 'graphql/type/definition'
import { List } from '../schema/List'
import {
  initializePlace,
  PlaceInitialization
} from '../mutations/places/createPlace'
import { placeArgs } from '../../graphql/mutations/lists/createList'

export const checkDuplicatePlace = {
  type: GraphQLBoolean,
  description: 'Find out if a duplicate place is being added to a list',
  args: {
    listId: { type: new GraphQLNonNull(GraphQLString) },
    place: {
      type: new GraphQLInputObjectType({
        name: 'NewPlaceToCheck',
        description: 'Place to check whether duplicate',
        fields: () => placeArgs
      })
    }
  },
  resolve: async (
    _parent: undefined,
    args: { listId: string; place: PlaceInitialization }
  ) => {
    const placeToAdd = await initializePlace(_parent, args.place)
    console.log('duplicate checked')
    const listToCheck = await List.findOne({ id: args.listId })
    return listToCheck.placeIds.includes(placeToAdd.id)
  }
}
