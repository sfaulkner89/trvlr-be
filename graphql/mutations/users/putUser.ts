import {
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
  checkInLocation: CheckInLocation
  countries: Country[]
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
    },
    countries: {
      type: new GraphQLList(CountryInput)
    }
  },
  resolve: async (_parent: undefined, args: UpdateFields) => {
    if (args.checkInLocation) {
      const user = await User.findOne({ id: args.userId })
      Object.assign(user, { checkInLocation: args.checkInLocation })
      user.save()
      return user
    } else if (args.countries) {
      console.log(args)
      const user = await User.findOne({ id: args.userId })

      const existingCountryNames = user.countries.map(c => c.country)

      const countriesToAdd = args.countries
        .filter(c => c.visited)
        .filter(c => !existingCountryNames.includes(c.country))
        .map(c => ({
          country: c.country,
          dateAdded: new Date().toISOString()
        }))

      const deselectedCountries = args.countries
        .filter(c => !c.visited)
        .map(c => c.country)

      const finalCountriesList = [...user.countries, ...countriesToAdd].filter(
        c => !deselectedCountries.includes(c.country)
      )

      user.countries = finalCountriesList
      user.save()
      return user
    }
  }
}
