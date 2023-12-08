import mongoose from 'mongoose'
const { Schema } = mongoose

export const ListSchema = new Schema(
  {
    id: { type: String!, index: true, required: true, unique: true },
    displayName: { type: String, required: true },
    photoLocation: String,
    location: Object,
    city: String,
    country: String,

    commentIds: Array,
    placeIds: Array,
    noteIds: Array,
    followers: Array,
    deleted: Boolean
  },
  {
    timestamps: true
  }
)

export const List = mongoose.model('lists', ListSchema)
