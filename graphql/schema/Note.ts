import mongoose from 'mongoose'
const { Schema } = mongoose

export const NoteSchema = new Schema({
  id: String!,
  placeId: String!,
  userId: String!,
  listId: String,
  content: String!,
  dateCreated: String!,
  dateModified: String!
})

export const Note = mongoose.model('notes', NoteSchema)
