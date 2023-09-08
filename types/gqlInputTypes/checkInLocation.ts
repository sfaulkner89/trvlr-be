import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { LatLngGQL } from './LatLngGQL'

export const checkInLocation = {
  location: { type: LatLngGQL },
  placeId: { type: GraphQLString },
  names: {
    type: new GraphQLInputObjectType({
      name: 'checkInLocationNames',
      fields: {
        main_text: { type: GraphQLString },
        secondary_text: { type: GraphQLString }
      }
    })
  }
}
