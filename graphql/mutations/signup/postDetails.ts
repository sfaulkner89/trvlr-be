import { GraphQLString } from 'graphql'
import { composeMongoose, composeWithMongoose } from 'graphql-compose-mongoose'
import { PlaceType } from '../../../graphql/types/PlaceType'
import Signup from '../../schema/Signup'
import { SignUpType } from '../../types/SignUpType'

export const postDetails = {
  type: SignUpType,
  description: 'Create a new signup',
  args: {
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    name: { type: GraphQLString }
  },
  resolve: (
    _: undefined,
    args: { email: string; username: string; name: string }
  ) => {
    console.log('new signup', args)
    const newSignup = new Signup({
      email: args.email,
      username: args.username.toLowerCase(),
      name: args.name
    })
    return newSignup.save()
  }
}
