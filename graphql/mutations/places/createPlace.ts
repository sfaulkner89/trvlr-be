import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql'
import { PlaceCommentGQL } from '../../../types/gqlInputTypes/PlaceCommentGQL'
import { PlaceRatingGQL } from '../../../types/gqlInputTypes/PlaceRatingGQL'
import { PlaceType } from '../../../graphql/types/PlaceType'
import { LatLngGQL } from '../../../types/gqlInputTypes/LatLngGQL'
import { PlaceComment } from '../../../types/tsTypes/PlaceComment'
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
  comment?: PlaceComment
}

export const initializePlace = async (
  _parent: undefined,
  args: PlaceInitialization
) => {
  const existingPlace = await Place.findOne({
    googlePlaceId: args.googlePlaceId
  })
  if (existingPlace) {
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
    comments: args.comment ? [args.comment] : []
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