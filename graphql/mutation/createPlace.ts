import { v4 } from 'uuid'
import { Place, PlaceTS } from '../schema/Place'
import { LatLng } from '../../types/tsTypes/LatLng'
import { PlaceRating } from '../../types/tsTypes/PlaceRating'

export type PlaceInitialization = {
  name: string
  address: string
  googlePlaceId: string
  location: LatLng
  city?: string
  country?: string
  dateCreated?: string
  dateModified?: string
  rating?: PlaceRating
  note?: string
  types?: string[]
  price?: number
}

export default async (_parent: undefined, args: PlaceInitialization) => {
  console.log('Google Place Id' + args.googlePlaceId)
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
    ratings: args.rating ? [args.rating] : [],
    types: args.types ? args.types : [],
    price: args.price
  })
  await place.save()
  return place
}
