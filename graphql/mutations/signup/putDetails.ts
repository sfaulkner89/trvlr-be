import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql'
import { composeMongoose, composeWithMongoose } from 'graphql-compose-mongoose'
import { PlaceType } from '../../../graphql/types/PlaceType'
import SignUps from '../../schema/Signup'
import { SignUpType } from '../../types/SignUpType'

export const putDetails = {
  type: SignUpType,
  description: 'Alter a signup',
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    countriesVisited: { type: new GraphQLList(GraphQLString) },
    countriesToVisit: { type: new GraphQLList(GraphQLString) }
  },
  resolve: async (
    _: undefined,
    args: {
      id: string
      countriesToVisit?: string[]
      countriesVisited?: string[]
    }
  ) => {
    const user = await SignUps.findById(args.id)
    if (args.countriesToVisit) user.countriesToVisit = args.countriesToVisit
    if (args.countriesVisited) user.countriesVisited = args.countriesVisited
    return user.save()
  }
}
