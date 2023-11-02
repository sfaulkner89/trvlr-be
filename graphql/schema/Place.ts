import mongoose, { Schema } from 'mongoose'

export const PlaceSchema = new Schema({
  id: { type: String!, index: true },
  name: String!,
  googlePlaceId: String!,
  location: Object!,
  city: String,
  country: String,
  dateCreated: Date!,
  dateModified: Date!,
  ratings: Array,
  comment: String,
  price: Number,
  types: Array
})

export const Place = mongoose.model('places', PlaceSchema)
