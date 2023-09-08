import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { User } from '../../schema/User'
import { UserType } from '../../types/UserType'
import { v4 } from 'uuid'
import { checkInLocation } from '../../../types/gqlInputTypes/checkInLocation'

type CheckInLocation = {
  location: {
    lat: number
    lng: number
  }
  placeId: string
  names: {
    main_text: string
    secondary_text: string
  }
}

type UpdateFields = {
  userId: string
  checkInLocation: CheckInLocation
}

export const putUser = {
  type: UserType,
  description: 'Alter a user',
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    checkInLocation: {
      type: new GraphQLInputObjectType({
        name: 'checkInLocation',
        description: 'the details of where user is checking in',
        fields: () => checkInLocation
      })
    }
  },
  resolve: async (_parent: undefined, args: UpdateFields) => {
    console.log(args)
    const user = await User.findOne({ id: args.userId })
    Object.assign(user, { checkInLocation: args.checkInLocation })
    user.save()
    return user
  }
}
