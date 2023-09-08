import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { LatLngGQL } from './LatLngGQL'

export const checkInLocation = new GraphQLObjectType({
  name: 'checkInOutput',
  fields: () => ({
    location: { type: LatLngGQL },
    placeId: { type: GraphQLString },
    names: {
      type: new GraphQLObjectType({
        name: 'checkInLocationOutput',
        fields: {
          main_text: { type: GraphQLString },
          secondary_text: { type: GraphQLString }
        }
      })
    }
  })
})
