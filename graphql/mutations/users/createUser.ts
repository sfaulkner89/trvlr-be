import { GraphQLNonNull, GraphQLString } from 'graphql'
import { User } from '../../schema/User'
import { UserType } from '../../types/UserType'
import { v4 } from 'uuid'

type UserInput = {
  email: string
  password: string
  username: string
  displayName: string
  dob: string
  profileLocation: string
}

export const createUser = {
  type: UserType,
  description: 'Create a new user',
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    dob: { type: new GraphQLNonNull(GraphQLString) },
    profileLocation: { type: GraphQLString }
  },
  resolve: async (_parent: undefined, args: UserInput) => {
    const user = new User({
      id: v4(),
      email: args.email,
      password: args.password,
      username: args.username,
      displayName: args.displayName,
      dob: args.dob,
      profileLocation: args.profileLocation,
      followers: [],
      following: [],
      listIds: [],
      countries: [],
      groups: []
    })
    user.save()
    return user
  }
}
