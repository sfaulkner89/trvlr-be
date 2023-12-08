import mongoose, { InferSchemaType, Schema } from 'mongoose'

export const PlaceSchema = new Schema(
  {
    name: String!,
    googlePlaceId: String!,
    address: String,
    location: Object!,
    city: String,
    country: String,
    ratings: Array<{
      id: String
      userId: String
      dateCreated: Date
      stars: Number
    }>,
    comment: String,
    price: Number,
    types: Array
  },
  {
    timestamps: true
  }
)

export const Place = mongoose.model('places', PlaceSchema)
export type PlaceTS = InferSchemaType<typeof PlaceSchema>
