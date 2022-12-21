import mongoose from 'mongoose'
const { Schema } = mongoose

export const ListSchema = new Schema({
  id: String!,
  displayName: String,
  photoLocation: String,
  location: Object,
  city: String,
  country: String,
  dateCreated: String,
  dateModified: String,
  placeIds: Array,
  followers: Array
})

export const List = mongoose.model('lists', ListSchema)
