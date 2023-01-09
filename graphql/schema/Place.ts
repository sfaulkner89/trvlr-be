import mongoose, { Schema } from 'mongoose'

export const PlaceSchema = new Schema({
  id: String!,
  name: String!,
  googlePlaceId: String!,
  location: Object!,
  city: String,
  country: String,
  dateCreated: Date!,
  dateModified: Date!,
  ratings: Array,
  comments: Array
})

export const Place = mongoose.model('places', PlaceSchema)
