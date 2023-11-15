import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { User } from '../../schema/User'
import { UserType } from '../../types/UserType'
import { v4 } from 'uuid'
import { checkInLocation } from '../../../types/gqlInputTypes/checkInLocation'
import { CountryInput } from '../../../types/gqlInputTypes/CountryInput'

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

type Country = {
  country: string
  visited: boolean
}

type CountryOutput = {
  country: string
  dateAdded: string
}

type UpdateFields = {
  userId: string
  contactIds: string[]
  groupName?: string
  visible: boolean
}

export const putContact = {
  type: UserType,
  description: 'Alter a user',
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    contactIds: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    groupName: { type: GraphQLString },
    visible: { type: GraphQLBoolean }
  },
  resolve: async (_parent: undefined, args: UpdateFields) => {
    if (args.groupName) {
      const user = await User.findOne({ id: args.userId })
      for (const contactId of args.contactIds) {
        const contact = user.contactIds.find(c => c.id === contactId)
        contact.group = args.groupName
      }
      user.save()
      return user
    } else if (args.visible !== undefined) {
      const user = await User.findOne({ id: args.userId })
      for (const contactId of args.contactIds) {
        console.log(
          user.id +
            '(' +
            user.username +
            ') has set' +
            contactId +
            ' to ' +
            (args.visible ? 'visible' : 'invisible')
        )
        const contact = user.contactIds.find(c => c.id === contactId)
        contact.visible = args.visible
      }
      user.save()
      return user
    }
  }
}
