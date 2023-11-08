import { PlaceType } from '../../../graphql/types/PlaceType'
import { PlaceRating } from '../../../types/tsTypes/PlaceRating'
import { Place } from '../../../graphql/schema/Place'
import { v4 } from 'uuid'
import { LatLng } from '../../../types/tsTypes/LatLng'
import { placeArgs } from '../lists/createList'

export type PlaceInitialization = {
  name: string
  googlePlaceId: string
  location: LatLng
  city?: string
  country?: string
  dateCreated: string
  dateModified: string
  rating?: PlaceRating
  note?: string
  types?: string[]
  price?: number
}

export const initializePlace = async (
  _parent: undefined,
  args: PlaceInitialization
) => {
  console.log(args.googlePlaceId)
  const existingPlace = await Place.findOne({
    googlePlaceId: args.googlePlaceId
  })
  if (existingPlace) {
    console.log('existing place found')
    return existingPlace
  }
  const place = new Place({
    id: v4(),
    name: args.name,
    googlePlaceId: args.googlePlaceId,
    location: args.location,
    city: args.city,
    country: args.country,
    dateCreated: new Date(),
    dateModified: new Date(),
    ratings: args.rating ? [args.rating] : [],
    types: args.types ? args.types : [],
    price: args.price
  })

  await place.save()
  return place
}

export const createPlace = {
  type: PlaceType,
  description: 'Initialise a place',
  args: placeArgs,
  resolve: initializePlace
}
